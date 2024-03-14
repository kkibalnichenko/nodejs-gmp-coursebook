import axios from 'axios';
import { PublicHoliday, PublicHolidayShort } from '../../types';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from '../../services/public-holidays.service';

const helpers = require('../../helpers');
const year = 2000;
const country = 'DE';
const status = 200;
const publicHolidays: PublicHoliday[] = [
    {
        date: 'test date',
        localName: 'test local name',
        name: 'test name',
        countryCode: 'test country code',
        fixed: false,
        global: false,
        counties: ['DE'],
        launchYear: 2000,
        types: ['test type'],
    },
];
const shortenPublicHolidays: PublicHolidayShort[] = [
    {
        name: 'test name',
        localName: 'test local name',
        date: 'test date',
    },
];

afterEach(() => {
    jest.clearAllMocks();
});

describe('public-holidays service', () => {
    describe('#getListOfPublicHolidays', () => {
        it('should return an array of shortenPublicHolidays', async () => {
            jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: publicHolidays }));
            const response = await getListOfPublicHolidays(year, country);

            expect(response).toEqual(shortenPublicHolidays);
        });

        it('should call API with proper arguments', async () => {
            const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: publicHolidays }));
            await getListOfPublicHolidays(year, country);

            expect(axiosGetSpy).toHaveBeenCalledWith(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`);
        });

        it('should return an empty array if error', async () => {
            jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
            const response = await getListOfPublicHolidays(year, country);

            expect(response).toEqual([]);
        });
    });

    describe('#checkIfTodayIsPublicHoliday', () => {
        it('should return an array of shortenPublicHolidays', async () => {
            jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status }));
            const response = await checkIfTodayIsPublicHoliday(country);

            expect(response).toBe(true);
        });

        it('should call API with proper arguments', async () => {
            const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status }));
            await checkIfTodayIsPublicHoliday(country);

            expect(axiosGetSpy).toHaveBeenCalledWith(`https://date.nager.at/api/v3/IsTodayPublicHoliday/${country}`);
        });

        it('should return an empty array if error', async () => {
            jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
            const response = await checkIfTodayIsPublicHoliday(country);

            expect(response).toBe(false);
        });
    });

    describe('#getNextPublicHolidays', () => {
        it('should return an array of shortenPublicHolidays', async () => {
            jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: publicHolidays }));
            const response = await getNextPublicHolidays(country);

            expect(response).toEqual(shortenPublicHolidays);
        });

        it('should call API with proper arguments', async () => {
            const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: publicHolidays }));
            await getNextPublicHolidays(country);

            expect(axiosGetSpy).toHaveBeenCalledWith(`https://date.nager.at/api/v3/NextPublicHolidays/${country}`);
        });

        it('should return an empty array if error', async () => {
            jest.spyOn(helpers, 'validateInput').mockReturnValue(true);
            jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error()));
            const response = await getNextPublicHolidays(country);

            expect(response).toEqual([]);
        });
    });
});