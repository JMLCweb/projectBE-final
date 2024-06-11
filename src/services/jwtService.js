const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function createToken(userId, email, role) {
  const tokenPayload = {
    userId,
    email,
    role,
    tokenExpiration: getTokenExpirationDate(),
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
  now.setDate(now.getDate() + 1); // Set expiration to 1 day in the future
  return now.toISOString(); // Return as ISO string
}

module.exports = {
  createToken,
  verifyToken,
  getTokenExpirationDate,
};
