import { PublicHoliday } from '../../types';

const helpers = require('../../helpers');
const { shortenPublicHoliday, validateCountry, validateYear, validateInput } = helpers;

afterEach(() => {
    jest.clearAllMocks();
});

describe('helpers', () => {
    describe('#validateCountry', () => {
        it('should return true if country is supported', () => {
            const country = 'DE';
            const result = validateCountry(country);
            expect(result).toBeTruthy();
        });

        it('should return false if country is not supported', () => {
            const country = 'UK';
            const result = validateCountry(country);
            expect(result).toBeFalsy();
        });
    });

    describe('#validateYear', () => {
        it('should return true if passed year equal to the current year', () => {
            const year = new Date().getFullYear();
            const result = validateYear(year);
            expect(result).toBeTruthy();
        });

        it('should return false if passed year is not the current year', () => {
            const year = 2022;
            const result = validateYear(year);
            expect(result).toBeFalsy();
        });
    });

    describe('#validateInput', () => {
        let validateCountrySpy: jest.SpyInstance;
        let validateYearSpy: jest.SpyInstance;
        const inputData = { year: 2000, country: 'DE' };

        beforeEach(() => {
            validateCountrySpy = jest.spyOn(helpers, 'validateCountry');
            validateYearSpy = jest.spyOn(helpers, 'validateYear');
        });

        it('should throw error if validateCountry return false', () => {
            validateCountrySpy.mockReturnValue(false);
            const error = new Error(`Country provided is not supported, received: ${inputData.country}`);

            expect(() => validateInput(inputData)).toThrow(error);
        });

        it('should throw error if validateYear return false', () => {
            validateCountrySpy.mockReturnValue(true);
            validateYearSpy.mockReturnValue(false);
            const error = new Error(`Year provided not the current, received: ${inputData.year}`);

            expect(() => validateInput(inputData)).toThrow(error);
        });

        it('should return true if there are no errors thrown', () => {
            validateCountrySpy.mockReturnValue(true);
            validateYearSpy.mockReturnValue(true);
            const expectedResult = validateInput(inputData);

            expect(() => expectedResult).toBeTruthy();
        });
    });

    describe('#shortenPublicHoliday', () => {
        it('should return PublicHolidayShort type', () => {
            const holiday: PublicHoliday = {
                date: 'test date',
                localName: 'test local name',
                name: 'test name',
                countryCode: 'test country code',
                fixed: false,
                global: false,
                counties: ['DE'],
                launchYear: 2000,
                types: ['test type'],
            };
            const expectedResult = {
                name: 'test name',
                localName: 'test local name',
                date: 'test date',
            };
            const result = shortenPublicHoliday(holiday);
            expect(result).toEqual(expectedResult);
        });
    });
});