const { resolve } = require('bluebird')
const connexionPromise = require('../index')

module.exports = async (stepID, userID) => {
  try {
    const connexion = await connexionPromise
    const [[data]] = await connexion.execute(`
      SELECT users.id FROM steps
      JOIN tasks
      ON tasks.id = steps.task_id
      JOIN todolists
      ON tasks.list_id = todolists.id
      JOIN users
      ON todolists.user_id = users.id
      WHERE steps.id = ${stepID}
    `)
    if (data?.id != userID) throw {message: 'User not authorized'}
    
    await connexion.execute(`DELETE FROM steps where steps.id = ${stepID}`)
  } catch (err) { throw err }
}