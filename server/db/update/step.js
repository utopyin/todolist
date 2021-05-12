const connexionPromise = require('../index')

module.exports = async function(userID1, step) {
  try {
    const connexion = await connexionPromise
    const [[{list_id: todolistID}]] = await connexion.execute(`SELECT * FROM tasks WHERE tasks.id = ${step.task_id}`)
    const [[{user_id: userID2}]] = await connexion.execute(`SELECT * FROM todolists WHERE todolists.id = ${todolistID}`)
    if (userID1 != userID2) throw {message: 'User not authorized'}
    await connexion.execute(`
      UPDATE steps
      SET steps.completed = ${step.completed}
      WHERE steps.id = ${step.id}
    `)
  } catch (err) { throw err }
}