const fetch = require("node-fetch");

const cruds = [
    'universities',
    'careers',
    'users',
    'vocacionales',
    'experiences',
    'team']


cruds.forEach((crud) => {
    var status;
    if (crud == 'users') {
        status = 500
    } else {
        status = 200
    }
    it(`Should response with ${crud} path data`, async function (done) {
        const host = process.env.DB_HOST;
        var response;
        if (host == 'localhost') {
            const port = process.env.PORT;
            response = await fetch(`http://${host}:${port}/${crud}`)
        } else if ((host).includes('heroku')) {
            response = await fetch(`http://${host}/${crud}`)
        } else {
            response = await fetch(`questudio-cl/${crud}`)
        }
        expect(response.status).toEqual(status);
        done();
    });
})