const connexionPromise = require('../index')

module.exports = (field, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connexion = await connexionPromise
      const [[{id, name, picture, isAdmin}]] = await connexion.execute(
        `SELECT * FROM users WHERE users.${field} = ${
          field == 'id' ? value
          : `'${value}'`
      }`)
      resolve({id, name, picture, isAdmin});
    } catch (err) {
      reject(err.message)
    }
  })
}