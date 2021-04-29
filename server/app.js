const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const addUser = require('./middlewares/addUser');

app.use(passport.initialize())
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000"} ));
app.use(addUser)

app.get('/', (req, res) => {
  res.json({message: 'Ok'})
});

app.listen(process.env.PORT || 5000, () => {
  process.env.NODE_ENV == 'dev' ?
    console.log(`Server listening on ${process.env.LOCAL + process.env.PORT}`)
    : console.log(`Server listening on adress:${process.env.PORT || 5000}`)
})

// routes
require('./routes/index')(app)

const getUsers = require('./db/get/users')
const deleteUser = require('./db/delete/user')

const handleGetUsers = async () => {
  try {
    console.log(await getUsers())
  } catch (err) {
    console.log(err)
  }
}

const handleDeleteUser = async () => {
  try {
    await deleteUser({email: 'utopy.core@gmail.com'})
  } catch (err) {
    console.log(err)
  }
}