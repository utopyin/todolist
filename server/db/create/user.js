const connexionPromise = require('../index')
const getUser = require('../get/users')
const initTodolist = require('./todolist')

module.exports = (name, email, picture) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connexion = await connexionPromise
      await connexion.execute(`INSERT INTO users (name, email, picture) VALUES ("${name}", "${email}", "${picture}")`)
      try {
        const { id, name, picture, isAdmin } = await getUser('email', email)
        await initTodolist(id)
        resolve({id, name, picture, isAdmin})
      } catch (errUser) {
        reject(errUser)
      }
    } catch (err) {
      try {
        const {id, name, picture, isAdmin} = await getUser('email', email)
        return resolve({id, name, picture, isAdmin})
      } catch (err) {
        return reject(err)
      }
    }
  })
}