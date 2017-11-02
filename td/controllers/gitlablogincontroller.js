'use  strict';
var passport = require('passport');

var gitlabLoginController = {};

//redirect to gitlab with csrf protection
gitlabLoginController.doLogin = function(req, res, next) {
    if (!req.session.gitlabOauthState) {
        require('crypto').randomBytes(32, function(err, buffer) {
            var state = buffer.toString('hex');
            req.session.gitlabOauthState = state;
            passport.authenticate('gitlab', { state: state })(req, res, next);
        });
    } else {
        passport.authenticate('gitlab')(req, res, next);
    }
};

//complete gitlab oauth sign in with csrf protection
gitlabLoginController.completeLogin = function(req, res) {
    
    var expectedState = req.session.gitlabOauthState;
    var incomingState = req.query.state;
    delete req.session.gitlabOauthState;
    
    if(!incomingState || expectedState != incomingState)
    {
        req.log.error({security: true, idp: 'gitlab'}, 'invalid oauth state value');
        //res.status(400).send('Threat Dragon received an invalid request from GitLab. Your internet connection may not be secure!');
        res.redirect('/');        
    } else {
        req.log.info({ security: true, userName: req.user.profile.username, idp: req.user.profile.provider }, 'logged in');
        var returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/');
    }
};

module.exports = gitlabLoginController;







