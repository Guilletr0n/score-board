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
    })

    return loadJSON()
  },
  saveData: function(_data) {
    //const readFile = fs.readFile('games.json');
    let game = JSON.stringify(_data);
    fs.writeFileSync('games.json', game)
  }
}