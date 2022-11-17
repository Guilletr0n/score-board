const fs = require('fs');
const util = require('util');

module.exports = {
  getData: function(_filename) {
    const readFile = util.promisify(fs.readFile);
    
    function loadJSON() {
      return readFile(_filename)
    }

    loadJSON().then(data => {
      return data
    }).catch((error)=>{
      console.error('File not found')
    })

    return loadJSON()
  },
  saveData: function(_file, _content) {
    fs.writeFileSync(_file, _content)
  }
}
