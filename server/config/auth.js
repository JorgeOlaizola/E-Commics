
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    console.log(req.isAuthenticated())
    res.json({ error_msg: 'Unauthorized'})
}

module.exports = helpers;