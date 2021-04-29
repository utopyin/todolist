const connection = require('../index')

module.exports = (id) => {
  return new Promise((resolve, reject) => {
    connection().query(
      `DELETE FROM users WHERE users.id = "${id}"`,
      function(err, results, fields) {
        if (err) reject(err.message)
        resolve(results);
      }
    );
  })
}