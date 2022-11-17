const games = [];
const db = "games.json"
const helper = require('./helpers.cjs');

module.exports = {
  addTogether: function(x,y){
      return x + y
  }, doSomethingWithObject: function(object){
      object.newKey = "easy AF";
      return object;
  }, simpleValue: 'also works',
  start: function (_home, _away) {

    let new_game = {
      home_team: _home,
      home_score: 0,
      away_team: _away,
      away_score: 0
    }

    load_games_summary(db).then(result => {
      const current_games = JSON.parse(result);
      current_games.push(new_game);
      helper.saveData(db, JSON.stringify(current_games));
    })
    let output = `${_home} - ${_away} game added to the summary`
    console.log(output)
    return output
  },
  finish: function (_home, _away) {
    load_games_summary(db).then(result => {
      let games_summary = JSON.parse(result);
      let games_filtered = games_summary.filter(function(value){
        return !(_home === value.home_team && _away === value.away_team);
      })
      helper.saveData(db, JSON.stringify(games_filtered))
    })
    
  },
  update: function (_home, _away, _home_score, _away_score) {
    load_games_summary(db).then(result => {
      let games_summary = JSON.parse(result);
      let updated_summary = games_summary.map( value => {
        if(value.home_team === _home && value.away_team === _away) {
          return {
            "home_team": _home,
            "away_team": _away,
            "home_score": _home_score,
            "away_score": _away_score
          }
        } else {
          return value
        }
      })
      helper.saveData(db, JSON.stringify(updated_summary))
    })
  },
  summary: function () {
    return load_games_summary(db).then(result => {
      let games_summary = JSON.parse(result);
      games_summary.forEach(game => {
        console.log(`${game.home_team} ${game.home_score} - ${game.away_team} ${game.away_score}`)
      });
      return games_summary.length
    })
  }
};

function load_games_summary(_file) {
  const jsondata = helper.getData(_file);
  return jsondata;
}

require('make-runnable/custom')({
  printOutputFrame: false,
  printOutput: false,
  printErrorOutput: true
})