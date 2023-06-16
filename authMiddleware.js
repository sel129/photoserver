const { db } = require('./db');

let firstAuthComplete = false;

const authCheck = (req, res, next) => {
    const pwd = process.env.pwd
    const authToken = req.get('Authentication')
    const authenticated = authToken && !!(db.get(authToken))

    if(authenticated) {
        next();
    } else {
        res.status(401).send('Authentication failed')
    }
}

exports.authCheck = authCheck;