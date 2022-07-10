const { error } = require('./src/constants');
const File = require('./src/file');
const expectedData = require('./src/expected');
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
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expectedData));
  }
})()