# Selenium Testing

Para correr los tests, se necesita estar en linux y descargar el driver para gecko (firefox) desde https://github.com/mozilla/geckodriver/releases/tag/v0.26.0

Luego, se debe incluir a tu PATH. Para esto se recomienda agregar la siguiente línea al archivo ~/.bashrc, y reiniciar la terminal.

```bash
export PATH="/home/greg/geckodriver-v0.26.0-linux64:$PATH"
```
```bash
yarn install
```

Para correr los tests por terminal:
```bash
yarn test-selenium
```

OJO: Si se quiere correr los test en producción, lo ideal es que las variables en data.js se cambien para no postear cosas repetidas y ensuciar la presentación de la página.
