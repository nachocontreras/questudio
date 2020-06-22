const request = require('supertest')
const app = require('../src/app')

const cruds = [
    'universities',
    'careers',
    'vocacionales',
    'experiences',
    'team']

cruds.forEach(async (crud) => {
    var status = 200;
    it(`${crud} route works`, async () => {
        const response = await request(app.callback()).get(`/${crud}`);
        console.log(response)
        expect(response.status).toBe(status);
    });
})