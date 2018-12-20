#! /usr/bin/env node
//Initialize

var FootballData = require('node-football-data');
var Table = require('cli-table2');
var fd = new FootballData('');

//Get todays euros matches
fd.getLeagugeFixturesInTimeFrame(424, "n1").then(function(res) {

  const fixtures = res.fixtures;

  if(fixtures.length === 0) {
    console.log("No fixtures today");
    return;
  }

  var table = new Table({
      head: ['Home', 'Goals', 'Goals', 'Away', 'Kick-off']
  });


  fixtures.forEach(function(fixture) {
    const fixtureDate = new Date(fixture.date);
    table.push([fixture.homeTeamName, fixture.goalsHomeTeam || fixture.result.goalsHomeTeam || 0, fixture.goalsAwayTeam || fixture.result.goalsAwayTeam|| 0, fixture.awayTeamName, fixtureDate.toLocaleTimeString()]);
  })

  console.log(table.toString());

}).catch(function(err) {
  console.log(err);
})
