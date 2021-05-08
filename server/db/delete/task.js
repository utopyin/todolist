const { resolve } = require('bluebird')
const connexionPromise = require('../index')

module.exports = async (taskID, userID) => {
  try {
    const connexion = await connexionPromise
    const [[{id}]] = await connexion.execute(`
      SELECT users.id FROM tasks
      JOIN todolists
      ON tasks.list_id = todolists.id
      JOIN users
      ON todolists.user_id = users.id
      WHERE tasks.id = ${taskID}
    `)
    if (id != userID) throw {message: 'User not authorized'}
    
    await connexion.execute(`DELETE FROM steps where steps.task_id = ${taskID}`)
    await connexion.execute(`DELETE FROM tasks where tasks.id = ${taskID}`)
  } catch (err) { throw err }
}