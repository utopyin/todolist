module.exports = (app) => {
  require('./google')(app)
  require('./github')(app)
  require('./user')(app)
}