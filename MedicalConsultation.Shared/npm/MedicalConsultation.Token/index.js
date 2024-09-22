const axios = require('axios').default;

const validateToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error();
    }
    const response = await axios.post(`${process.env.AUTH_URL}/api/v1/auth/validate`, {
      token: req.headers.authorization
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.data) {
      throw new Error();
    }
    req.role = response.data.data.role;
    next();
  } catch (error) {
    return res.status(401).json({ data: {}, notifications: ['token is invalid']});
  }
}

const validateRole = (role) => {
  return (req, res, next) => {
    const roles = role.split(',');
    if (!req.role || !roles.includes(req.role)) {
      return res.status(403).json({ data: {}, notifications: ['insufficient permissions']});
    }
    next();
  }
}

module.exports = { validateToken, validateRole };