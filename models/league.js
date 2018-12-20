var db = require('../db/config');

var league = {};

league.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM league;")
    .then(function(result){
        res.locals.leagues = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

league.find = function(req, res, next){
    db.oneOrNone("SELECT * FROM league WHERE id=$1;", [req.params.id])
    .then(function(result){
        res.locals.league = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

league.update = function(req, res, next){
    db.one("UPDATE league SET name=$1, founded=$2, number_of_teams=$3, champion=$4, region=$5, country=$6, image=$7 WHERE id=$8 RETURNING id;", 
    [req.body.name, req.body.founded, req.body.number_of_teams, req.body.champion, req.body.region, req.body.country, req.body.image, req.params.id])
    .then(function(result){
        res.locals.league_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

league.delete = function(req, res, next){
    db.none("DELETE FROM league WHERE id=$1;", [req.params.id])
    .then(function(result){
        res.locals.league = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}


league.create = function(req, res, next){
    db.one("INSERT INTO league(name, founded, number_of_teams, champion, region, country, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;"
    , [req.body.name, req.body.founded, req.body.number_of_teams, req.body.champion, req.body.region, req.body.country, req.body.image])
    .then(function(result){
        res.locals.league_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}


league.findTeamsByLeague = function(req, res, next){
    db.manyOrNone("SELECT t.name AS team_name , l.name AS league_name, s.matches_played, s.win, s.draw, s.lose, s.goals_for, s.goals_against, s.goals_difference, s.points, s.teams_id, s.league_id  FROM standings s, team t, league l WHERE s.teams_id = t.id AND s.league_id = l.id AND l.id=$1 ORDER BY s.points DESC;" 
    , [req.params.id])
    .then(function(result){
        res.locals.standings = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

league.findTeamByLeague = function(req, res, next){
    db.oneOrNone("SELECT t.name AS team_name , l.name AS league_name, t.image, s.id, s.matches_played, s.win, s.draw, s.lose, s.goals_for, s.goals_against, s.goals_difference, s.points, s.teams_id, s.league_id FROM standings s, team t, league l WHERE s.teams_id = t.id AND s.league_id = l.id AND s.teams_id=$1;" 
    , [req.params.teamId])
    .then(function(result){
        console.log(req.params)
        res.locals.standings = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

league.editTeamsByLeague = function(req, res, next){
    db.one("UPDATE standings SET matches_played=$1, win=$2, draw=$3, lose=$4, goals_for=$5, goals_against=$6, goals_difference=$7, points=$8, teams_id=$9, league_id =$10 WHERE league_id=$11  AND teams_id=$12 RETURNING *;" 
    , [req.body.matches_played, req.body.win, req.body.draw, req.body.lose, req.body.goals_for, req.body.goals_against, req.body.goals_difference, req.body.points, req.body.teams_id, req.body.league_id, req.params.id, req.params.teamId])
    .then(function(result){
        res.locals.standings = result;       
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

league.addTeamsByLeague = function(req, res, next){
    db.one("INSERT INTO standings(matches_played, win, draw, lose, goals_for, goals_against, goals_difference, points, teams_id, league_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;" 
    , [req.body.matches_played, req.body.win, req.body.draw, req.body.lose, req.body.goals_for, req.body.goals_against, req.body.goals_difference, req.body.points, req.body.teams_id, req.body.league_id])
    .then(function(result){
        res.locals.standing = result;
        console.log(result);
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

league.deleteTeamByLeague = function(req, res, next){
    db.oneOrNone("DELETE FROM standings WHERE league_id=$1 AND teams_id=$2 RETURNING *;", [req.params.id, req.params.teamId])
    .then(function(result){
        res.locals.standings = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

module.exports = league;