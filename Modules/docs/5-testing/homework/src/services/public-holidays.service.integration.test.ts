/* eslint-disable jest/no-conditional-expect */
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';

const currentYear = new Date().getFullYear();

describe('Public holidays service (Integration tests)', () => {
  test('should return list of public holidays from API', async () => {
    const holidays = await getListOfPublicHolidays(currentYear, 'GB');

    holidays.forEach((holiday) => {
      // since dates of holidays change from year to year
      // we just check that we receive data needed
      expect(Object.keys(holiday)).toEqual(['name', 'localName', 'date']);
      expect(holiday.date).toContain(`${currentYear}`);
    });
  });

  test('should return list of next public holidays', async () => {
    const holidays = await getNextPublicHolidays('GB');

    holidays.forEach((holiday) => {
      // since dates of holidays change from year to year
      // we just check that we receive data needed
      // getNextPublicHolidays() func can return holidays for next year
      expect(Object.keys(holiday)).toEqual(['name', 'localName', 'date']);
    });
  });

  test('should check if today is public holiday', async () => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const holidays = await getNextPublicHolidays('GB');
    const isTodayHoliday = await checkIfTodayIsPublicHoliday('GB');

    if (!holidays.length) {
      expect(isTodayHoliday).toEqual(false);
      return;
    }

    const closestHolidayDate = holidays[0].date;

    if (today === closestHolidayDate) {
      expect(isTodayHoliday).toEqual(true);
      return;
    }

    expect(isTodayHoliday).toEqual(false);
  });
});
