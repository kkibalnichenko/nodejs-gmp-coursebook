import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { LongWeekend } from '../types';

describe('Public Holidays API', () => {
  describe('/LongWeekend', () => {
    test('should return list of long weekends', async () => {
      const year = 2022;
      const country = 'UA';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/LongWeekend/${year}/${country}`);
      expect(status).toEqual(200);

      body.forEach((weekend: LongWeekend) => {
        expect(weekend).toEqual({
          startDate: expect.any(String),
          endDate: expect.any(String),
          dayCount: expect.any(Number),
          needBridgeDay: expect.any(Boolean),
        });
      });
    });

    test('should return 404 if country is invalid', async () => {
      const year = 2022;
      const country = 'FakeCountry';

      const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/LongWeekend/${year}/${country}`);
      expect(status).toEqual(404);
    });

    test('should return 500 if year is far in the future', async () => {
      const year = 202020202;
      const country = 'FR';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/LongWeekend/${year}/${country}`);
      expect(status).toEqual(500);
      expect(body).toEqual({});
    });
  });
});
