import { validateInput, shortenPublicHoliday } from './helpers';
import { PublicHoliday } from './types';

describe('Public holidays helpers', () => {
  describe('Validate input', () => {
    test('should return true if input is valid', () => {
      expect(validateInput({ year: 2022, country: 'FR' })).toEqual(true);
    });

    test('should throw error if year is invalid', () => {
      expect(() => validateInput({ year: 2020, country: 'FR' })).toThrow(
        'Year provided not the current, received: 2020',
      );
    });

    test('should throw error if country is invalid', () => {
      expect(() => validateInput({ year: 2022, country: 'USA' })).toThrow(
        'Country provided is not supported, received: USA',
      );
    });
  });

  describe('Shorten public holiday', () => {
    test('should return name, localName and date only for public holiday object', () => {
      const holiday: PublicHoliday = {
        date: '2022-10-14',
        localName: 'Local name',
        name: 'Name',
        countryCode: 'FR',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['Public'],
      };

      expect(shortenPublicHoliday(holiday)).toEqual({
        date: '2022-10-14',
        localName: 'Local name',
        name: 'Name',
      });
    });
  });
});
