const getTodolist = require('../db/get/todolist');
const createTask = require('../db/create/task')

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

  app.post('/user/todolist/task', async (req, res, next) => {
    if (!req.user) return res.status(404).json({message: 'User not found or no tokens were provided'})
    const task = req.body.task
    if (!task) return res.status(400).json({message: 'No task provided'})
    try {
      await createTask(req.user.id, task)
      res.json({message: 'ok'})
    } catch ({message}) {
      res.status(500).json({message: 'Internal server error when uploading the task : ' + message})
    }
  })

  app.post('/user/todolist/step', (req, res, next) => {
    if (!req.user) res.status(404).json({message: 'User not found or no tokens were provided'})

  })
}