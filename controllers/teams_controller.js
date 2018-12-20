var express = require('express');
var router = express.Router();

var teams = require('../models/team');


router.get('/', teams.getAll, renderIndex);
router.get('/new', renderNew);
router.get('/:id/edit', teams.find, renderEdit);
router.get('/:id', teams.find, renderShow);

router.delete('/:id', teams.delete, redirectIndex);
router.post('/', teams.create, redirectShow);
router.put('/:id', teams.update, redirectShow);

function renderIndex(req, res){
    var mustacheVariable = {
        team: res.locals.teams
    }
    res.render('./teams/index', mustacheVariable);
}

function renderShow(req, res){
    var mustacheVariable = res.locals.team;
    res.render('./teams/show', mustacheVariable);
}

function renderNew(req, res){
    res.render('./teams/new');
}

function renderEdit(req, res){
    var mustacheVariable = res.locals.team;
    res.render('./teams/edit', mustacheVariable);
}

function redirectIndex(req, res){
    res.redirect('/teams');
}

function redirectShow(req, res){
    res.redirect(`/teams/${res.locals.team_id}`);
}

module.exports = router;