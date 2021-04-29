const connexionPromise = require('../index')

module.exports = async function(id) {
  try {
    const connexion = await connexionPromise
    connexion.execute(`INSERT INTO todolists (user_id) VALUES (${id})`)
  } catch {}
}