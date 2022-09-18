import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import { PublicHoliday, PublicHolidayShort } from '../types';

const publicHolidays: PublicHoliday[] = [
  {
    date: '2022-10-14',
    localName: 'Local name',
    name: 'Name',
    countryCode: 'FR',
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
  {
    date: '2022-10-20',
    localName: 'Local name',
    name: 'Name',
    countryCode: 'FR',
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public'],
  },
];

const publicHolidaysShort: PublicHolidayShort[] = [
  {
    date: '2022-10-14',
    localName: 'Local name',
    name: 'Name',
  },
  {
    date: '2022-10-20',
    localName: 'Local name',
    name: 'Name',
  },
];

describe('Public holidays service (Unit tests)', () => {
  describe('Get list of public holidays', () => {
    test('should return list of public holidays', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: publicHolidays });

      const holidays = await getListOfPublicHolidays(2022, 'FR');
      expect(holidays).toEqual(publicHolidaysShort);
    });

    test('should return empty object if request to API failed', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('Error'));

      const holidays = await getListOfPublicHolidays(2022, 'FR');
      expect(holidays).toEqual([]);
    });

    test('should throw error if year is not valid', async () => {
      await expect(getListOfPublicHolidays(2020, 'FR')).rejects.toThrow(
        new Error(`Year provided not the current, received: 2020`),
      );
    });

    test('should throw error if country is not valid', async () => {
      await expect(getListOfPublicHolidays(2020, 'USA')).rejects.toThrow(
        new Error(`Country provided is not supported, received: USA`),
      );
    });
  });

  describe('Check if today is public holiday', () => {
    test('should return true if status code from API is 200', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 200 });
      await expect(checkIfTodayIsPublicHoliday('FR')).resolves.toEqual(true);
    });

    test('should return false if status code from API is 204', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ status: 204 });
      await expect(checkIfTodayIsPublicHoliday('FR')).resolves.toEqual(false);
    });

    test('should return false if request to API failed', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('Error'));
      await expect(checkIfTodayIsPublicHoliday('FR')).resolves.toEqual(false);
    });

    test('should throw error if country is not valid', async () => {
      await expect(checkIfTodayIsPublicHoliday('USA')).rejects.toThrow(
        new Error(`Country provided is not supported, received: USA`),
      );
    });
  });

  describe('Get next public holidays', () => {
    test('should return list of public holidays', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: publicHolidays });

      const holidays = await getNextPublicHolidays('FR');
      expect(holidays).toEqual(publicHolidaysShort);
    });

    test('should return empty object if request to API failed', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('Error'));

      const holidays = await getNextPublicHolidays('FR');
      expect(holidays).toEqual([]);
    });

    test('should throw error if country is not valid', async () => {
      await expect(getNextPublicHolidays('USA')).rejects.toThrow(
        new Error(`Country provided is not supported, received: USA`),
      );
    });
  });
});
