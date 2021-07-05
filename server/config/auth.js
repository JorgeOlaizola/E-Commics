
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    console.log(req.isAuthenticated())
    req.flash('error_msg', 'Para acceder aquí debes iniciar sesión')
    res.send(req.flash())
}

module.exports = helpers;