import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from '../../services/public-holidays.service';

const year = new Date().getFullYear();
const country = 'DE';

describe('Public-holidays service', () => {
    describe('#getListOfPublicHolidays', () => {
        it('should return array of shorten public holidays', async () => {
            const response = await getListOfPublicHolidays(year, country);

            expect(response).toBeDefined();
        });

        it('should return an empty array if error', async () => {
            let response;
            try {
                response = await getListOfPublicHolidays(year, country);
            } catch (error) {
                expect(response).toBe([]);
            }
        });
    });

    describe('#checkIfTodayIsPublicHoliday', () => {
        it('should return success status code', async () => {
            const response = await checkIfTodayIsPublicHoliday(country);

            expect(response).toBeDefined();
            expect(typeof response).toBe('boolean');
        });

        it('should return false if error', async () => {
            let response;
            try {
                response = await checkIfTodayIsPublicHoliday(country);
            } catch (error) {
                expect(response).toBeFalsy();
            }
        });
    });

    describe('#getNextPublicHolidays', () => {
        it('should return array of shorten public holidays', async () => {
            const response = await getNextPublicHolidays(country);

            expect(response).toBeDefined();
        });

        it('should return an empty array if error', async () => {
            let response;
            try {
                response = await getNextPublicHolidays(country);
            } catch (error) {
                expect(response).toBe([]);
            }
        });
    });
});