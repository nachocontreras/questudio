const request = require('supertest')
const app = require('../src/app')

const cruds = [
    'universities',
    'careers',
    'users',
    'vocacionales',
    'experiences',
    'team']

cruds.forEach(async (crud) => {
    var status;
    if (crud == 'users') {
        status = 500
    } else {
        status = 200
    }
    it(`${crud} route works`, async () => {
        const response = await request(app.callback()).get(`/${crud}`);
        expect(response.status).toBe(status);
    });
})