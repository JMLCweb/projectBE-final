const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function createToken(id, email, role) {
  const tokenPayload = {
    id,
    email,
    role,
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
  console.log(payload);
  return payload;
}

module.exports = {
  createToken,
  verifyToken,
};
