var auth = {};

auth.restrict = function(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
}

auth.onlyUsers = function(req, res, next) {
  if (req.session.user) {
    if(req.params.id == req.session.user.id){
      next();
    }else{
      res.redirect(`/users/${req.session.user.id}`)
    }
  } else {
    res.redirect('/login');
  }
}

module.exports = auth;