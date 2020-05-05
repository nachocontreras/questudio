var suma = require('../src/suma')

describe('Testeo de las rutas', () => {
	it('Verifica que esten bien los paths', () => {
		expect(suma(1,2)).toEqual(3);
	});
});