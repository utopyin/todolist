const jwt = require('jsonwebtoken');
const getUser = require('../db/get/users')

const createTokens = async ({id, isAdmin}, secret, secret2) => {
  const createToken = jwt.sign({
      userId: id,
      isAdmin
    },
    secret,
    {
      expiresIn: '1m'
    }
  );

  const createRefreshToken = jwt.sign({
      userId: id,
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};

const refreshTokens = async (refreshToken, SECRET, SECRET_2) => {
  
  try {
    jwt.verify(refreshToken, SECRET_2);
  } catch (err) {
    return {};
  }

  let userId = -1;

  try {
    let decodedToken = jwt.decode(refreshToken);
    userId = decodedToken.userId
  } catch (err) {
    console.log(err)
    return {};
  }

  if (!userId) {
    console.log('nooo userId')
    return {};
  }

  try {
    const user = await getUser('id', userId);
    const [newToken, newRefreshToken] = await createTokens(user, SECRET, SECRET_2);
    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user,
    };
  } catch (err) {
    return {};
  }
};

module.exports = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET)
      const user = await getUser('id', id)
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      try {
        const newTokens = await refreshTokens(refreshToken, process.env.JWT_SECRET, process.env.JWT_SECRET_2);
        if (newTokens.token && newTokens.refreshToken) {
          res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
          res.set('x-token', newTokens.token);
          res.set('x-refresh-token', newTokens.refreshToken);
        }
        req.user = newTokens.user;
      } catch (err) {
        console.log(err)
      }
    }
  }
  next();
}

module.exports.createTokens = createTokens;