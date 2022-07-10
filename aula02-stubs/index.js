const Service = require('./src/service');

(async () => {
  const response = await new Service().makeRequest('https://swapi.dev/api/planets/1/');
  console.log(response);
})()