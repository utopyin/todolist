const getTodolist = require('../db/get/todolist');

module.exports = (app) => {
  app.get('/user/data', (req, res, next) => {
    if (req.user) return res.json(req.user)
    res.status(404).json({message: 'User not found or no tokens were provided'})
  })

  app.get('/user/todolist', async (req, res, next) => {
    if (!req.user)
      return res.status(404).json({
        message: 'User not found or no tokens were provided'
      })

    const todos = await getTodolist(req.user.id)
    res.json(todos)
  })

  app.post('/user/todolist/task', (req, res, next) => {
    if (!req.user) res.status(404).json({message: 'User not found or no tokens were provided'})

  })

  app.post('/user/todolist/step', (req, res, next) => {
    if (!req.user) res.status(404).json({message: 'User not found or no tokens were provided'})

  })
}