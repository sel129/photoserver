const { Level } = require('level')
const db = new Level('uploads/photodb', { valueEncoding: 'json' })

// function getDB() {
//     return db;
// };

exports.db = db