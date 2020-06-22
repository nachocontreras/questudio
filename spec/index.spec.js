const app = require('../src/app');

console.log("Executing in " + process.env.NODE_ENV + " environment.")

const PORT = process.env.PORT || 5432;
app.listen(PORT)
console.info(`Listening to ${PORT}`)