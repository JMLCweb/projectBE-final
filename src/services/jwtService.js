const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function createToken(userId, email) {
  const tokenPayload = {
    userId,
    email,
  };

  const token = jwt.sign(tokenPayload, jwtSecret, {
    expiresIn: "1d",
  });
  return token;
}

function verifyToken(token) {
  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    console.log(error);
  }
  return payload;
}
function getTokenExpirationDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return now;
}

module.exports = {
  createToken,
  verifyToken,
  getTokenExpirationDate,
};
