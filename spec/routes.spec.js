const request = require('supertest')
const app = require('../src/app')


const cruds = [
    'universities',
    'careers',
    'vocacionales',
    'experiences',
    'team']


describe('unitary testing', function () {
    const status = 200;
    cruds.forEach((crud) => {
        it(`${crud} route works`, async () => {
            const response = await request(app.callback()).get(`/${crud}`);
            expect(response.status).toBe(status);
        });
    })
})
