//Initialize
var FootballData = require('node-football-data');
var fd = FootballData('APIKEY');

//Get the first match of the euros
fd.getAll = function(res){
fd.getLeagugeFixtures(424)
.then(function(res) {
  var fixtures = res;
  console.log(fixtures.fixtures[0].homeTeamName + " vs " + fixtures.fixtures[0].awayTeamName);
}).catch(function(err) {
  console.log(err);
})
}

module.exports = fd;