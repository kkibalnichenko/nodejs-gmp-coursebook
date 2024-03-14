import request from 'supertest';

const NAGER_DATE_API = 'https://date.nager.at';

describe('Nager.Date API PublicHoliday', () => {
    describe('/NextPublicHolidaysWorldwide', () => {
        it('should return 200 and array of upcoming public holidays for the next 7 days', async () => {
            const {status, body} = await request(NAGER_DATE_API).get('/api/v3/NextPublicHolidaysWorldwide');

            expect(status).toEqual(200);
            body.forEach((holiday: any) => {
                expect(holiday).toEqual({
                    date: expect.any(String),
                    localName: expect.any(String),
                    name: expect.any(String),
                    countryCode: expect.any(String),
                    fixed: expect.any(Boolean),
                    global: expect.any(Boolean),
                    counties: expect.any(Object),
                    launchYear: expect.any(Object),
                    types: expect.any(Object),
                });
            });
        });
    });

    describe('/PublicHolidays', () => {
        it('should return 200 and array of upcoming public holidays', async () => {
            const year = 2024;
            const countryCode = 'NL';
            const {status, body} = await request(NAGER_DATE_API).get(`/api/v3/PublicHolidays/${year}/${countryCode}`);

            expect(status).toEqual(200);
            body.forEach((holiday: any) => {
                expect(holiday).toEqual({
                    date: expect.any(String),
                    localName: expect.any(String),
                    name: expect.any(String),
                    countryCode: expect.any(String),
                    fixed: expect.any(Boolean),
                    global: expect.any(Boolean),
                    counties: expect.any(Object),
                    launchYear: expect.any(Object),
                    types: expect.any(Object),
                });
            });
        });

        it('should return 400 if validation failure occurred', async () => {
            const year = 1024;
            const countryCode = 'NL';
            const {status} = await request(NAGER_DATE_API).get(`/api/v3/PublicHolidays/${year}/${countryCode}`);

            expect(status).toEqual(400);
        });

        it('should return 404 if countryCode is unknown', async () => {
            const year = 2024;
            const countryCode = 'UK';
            const {status} = await request(NAGER_DATE_API).get(`/api/v3/PublicHolidays/${year}/${countryCode}`);

            expect(status).toEqual(404);
        });
    });
});