const createUser = require('../db/create/user')

const createUserAsync = (name, email, picture) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await createUser(name, email, picture)
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = async (req, res, next) => {
  const {user: {name, email, picture}} = req
  try {
    const userData = await createUserAsync(name, email, picture)
    req.user = userData
    next()
  } catch (err) {
    console.log(err)
    return res.redirect("http://localhost:3000/?error=bad_auth");
  }
}