var express = require('express');
var router = express.Router();

var leagues = require('../models/league');
var football = require('../models/football');


router.get('/', leagues.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id/edit', leagues.find, renderEdit);
router.get('/:id/teams', leagues.find, leagues.findTeamsByLeague, renderLTIndex);
router.get('/:id/teams/new', leagues.find ,renderLTNew);
router.get('/:id/team/:teamId/edit', leagues.findTeamByLeague, renderLTEdit);
router.get('/:id/team/:teamId', leagues.find, leagues.findTeamByLeague, renderLTShow);
router.get('/:id', leagues.find, renderShow);

router.delete('/:id/team/:teamId', leagues.deleteTeamByLeague, redirectLTIndex)
router.delete('/:id', leagues.delete, redirectIndex);
router.post('/', leagues.create, redirectShow);
router.post('/:id/teams', leagues.addTeamsByLeague, redirectLT2Index)
router.put('/:id/team/:teamId', leagues.editTeamsByLeague, redirectLTShow);
router.put('/:id', leagues.update, redirectShow);

function renderLTIndex(req, res){
    var mustacheVariable = {
        teams: res.locals.standings,
        league: res.locals.league
    }
    res.render('./league_teams/index', mustacheVariable);
}

function renderLTShow(req, res){
    var mustacheVariable = {
        teams: res.locals.standings,
        league: res.locals.league
    }
    console.log(res.locals.standings);
    res.render('./league_teams/show', mustacheVariable);
}

function renderLTEdit(req, res){
    var mustacheVariable = res.locals.standings;
    console.log('******', mustacheVariable);
    res.render('./league_teams/edit', mustacheVariable);
}

function renderLTNew(req, res){
    var mustacheVariable = res.locals.league;
    console.log('******', mustacheVariable);
    res.render('./league_teams/new', mustacheVariable);
}

function redirectLTShow(req, res){

    res.redirect(`/leagues/${res.locals.standings.league_id}/team/${res.locals.standings.teams_id}`);
}

function redirectLTIndex(req, res){
    
    res.redirect(`/leagues/${res.locals.standings.league_id}/teams`);
}

function redirectLT2Index(req, res){
    console.log('***', res.locals.standing);
    res.redirect(`/leagues/${res.locals.standing.league_id}/teams`);
}

function renderIndex(req, res){
    var mustacheVariable = {
        league: res.locals.leagues
    }
    res.render('./leagues/index', mustacheVariable);
}

function renderShow(req, res){
    var mustacheVariable = res.locals.league;
    res.render('./leagues/show', mustacheVariable);
}

function renderNew(req, res){
    res.render('./leagues/new');
}

function renderEdit(req, res){
    var mustacheVariable = res.locals.league;
    res.render('./leagues/edit', mustacheVariable);
}

function redirectIndex(req, res){
    res.redirect('/leagues');
}

function redirectShow(req, res){
    res.redirect(`/leagues/${res.locals.league_id}`);
}

module.exports = router;