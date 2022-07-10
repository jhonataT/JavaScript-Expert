const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Closures
(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "name": "Jhonata Tenorio",
        "id": 123,
        "profession": "JavaScript Specialist",
        "birthDay": 2000
      },
      {
        "name": "Maria Santos",
        "id": 321,
        "profession": "Ruby Developer",
        "birthDay": 1994
      },
      {
        "name": "Clara Ávila",
        "id": 231,
        "profession": "Software Engineer",
        "birthDay": 1986
      }
    ];
    
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

})()