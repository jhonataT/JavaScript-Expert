const { readFile } = require('fs/promises');
const User = require('./user');
const { error } = require('./constants');

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: [ "id", "name", "profession", "age" ]
};

class File {
  static async csvToJson(filePath) { 
    const content = await File.getFileContent(filePath);
    const validation = await File.isValid(content);
    if(!validation.valid) throw new Error(validation.error);

    return File.parseCSVToJSON(content);
  }
  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString('utf8');
  }
  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split('\n');
    const isHeaderValid = header.trim() === options.fields.join(',').trim();

    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isLinesLengthValid = (
      fileWithoutHeader.length > 0 && 
      fileWithoutHeader.length <= options.maxLines
    );

    if(!isLinesLengthValid) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return {
      error: false,
      valid: true
    }
  }
  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n')
    const firstLine = lines.shift();
    const header = firstLine.trim().split(',');
    const users = lines.map(line => {
      const columns = line.trim().split(',');
      let user = {};
      for(const index in columns) {
        user[header[index]] = columns[index];
      }
      return new User(user);
    })

    return users;
  }
}

module.exports = File;