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
  return Math.floor(Date.now() / 1000) + 24 * 60 * 60; // Retorna o timestamp de expiração em segundos
}

module.exports = {
  createToken,
  verifyToken,
  getTokenExpirationDate,
};
