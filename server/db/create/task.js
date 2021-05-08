const connexionPromise = require('../index')

module.exports = async function(userID, task) {
  try {
    const connexion = await connexionPromise
    const [[{id: todolistID}]] = await connexion.execute(`SELECT * FROM todolists WHERE todolists.user_id = ${userID}`)
    const [{insertId: taskID}] = await connexion.execute(`INSERT INTO tasks (list_id, title) VALUES (${todolistID}, "${task.title}")`)
    task.steps.map(({value: title, id: number}) => {
      connexion.execute(`
        INSERT INTO steps
        (task_id, title, number, completed)
        VALUES (${taskID}, "${title}", ${number}, false)
      `)
    })
  } catch (err) { throw err }
}