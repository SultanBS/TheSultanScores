var db = require('../db/config');

var team = {};

team.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM team;")
    .then(function(result){
        res.locals.teams = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    });
}

team.find = function(req, res, next){
    db.oneOrNone("SELECT * FROM team WHERE id=$1;", [req.params.id])
    .then(function(result){
        res.locals.team = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}


team.update = function(req, res, next){
    db.one("UPDATE team SET name=$1, country=$2, established=$3, stadium=$4, image=$5 WHERE id=$6 RETURNING id;", 
    [req.body.name, req.body.country, req.body.established, req.body.stadium, req.body.image, req.params.id])
    .then(function(result){
        res.locals.team_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

team.delete = function(req, res, next){
    db.none("DELETE FROM team WHERE id=$1", [req.params.id])
    .then(function(result){
        res.locals.team = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

team.create = function(req, res, next){
    db.one("INSERT INTO team(name, country, established, stadium, image) VALUES ($1, $2, $3, $4, $5) RETURNING id;"
    , [req.body.name, req.body.country, req.body.established, req.body.stadium, req.body.image])
    .then(function(result){
        res.locals.team_id = result.id;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

module.exports = team;