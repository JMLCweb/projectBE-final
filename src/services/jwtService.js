const jwt = require("jsonwebtoken");

const jwtSecret = "superSecretPrivateKey";

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
  now.setDate(now.getDate() + 1); // Set expiration to 1 day from now
  return now;
}
module.exports = {
  createToken,
  verifyToken,
  getTokenExpirationDate,
};