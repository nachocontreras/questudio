var request = require('request')
var server = require('../src/app')

describe('Server running;', () => {
	it('checking environment', () => {
		expect(server.env).toBe('test');
	});
});