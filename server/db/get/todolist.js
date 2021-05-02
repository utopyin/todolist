const connexionPromise = require('../index')

// `SELECT * FROM todolists WHERE todolists.user_id = ${userID}`
// `SELECT * FROM tasks WHERE tasks.list_id = ${todolistID}`
// `SELECT * FROM steps WHERE steps.task_id = ${task.id}`

module.exports = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connexion = await connexionPromise
      const [[{id: todolistID}]] = await connexion.execute(`SELECT * FROM todolists WHERE todolists.user_id = ${userID}`)
      let [tasks] = await connexion.execute(`SELECT * FROM tasks WHERE tasks.list_id = ${todolistID}`)
      tasks = await Promise.all(tasks.map(async task => {
        let [steps] = await connexion.execute(`SELECT * FROM steps WHERE steps.task_id = ${task.id}`)
        steps = steps.map(step => {
          return {id: step.id, title: step.title, number: step.number, completed: !!step.completed}
        })
        
        return {id: task.id, title: task.title, steps}
      }))
      resolve({id: todolistID, tasks})
    } catch (err) {
      reject(err)
    }
  })
}