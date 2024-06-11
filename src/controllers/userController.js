const {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  getUserByEmail,
} = require("../db/usersDB");
const argon2 = require("argon2");
const jwtService = require("../services/jwtService");

const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await getUserByEmail(email);

  if (!result) {
    res.status(400).json({
      status: "error",
      message: "User not found",
    });
    return;
  }

  const dbSavedHash = result.password;
  const passwordMatch = await argon2.verify(dbSavedHash, password);
  if (!passwordMatch) {
    res.status(404).json({
      status: "error",
      message: "Wrong password",
    });
    return;
  }

  const token = jwtService.createToken(result.id, result.email, result.role);

  res.json({
    status: "ok",
    message: "User logged in",
    token,
    tokenExpiration: jwtService.getTokenExpirationDate(),
  });
};

const fetchUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hash = await argon2.hash(password);
    const newUser = await addUser({
      ...req.body,
      password: hash,
    });

    const token = jwtService.createToken(newUser._id, newUser.email);
    const tokenExpiration = jwtService.getTokenExpirationDate();
    res.status(201).json({ user: newUser, token, tokenExpiration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyUserById = async (req, res) => {
  try {
    const updated = await updateUserById(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeUserById = async (req, res) => {
  try {
    const deleted = await deleteUserById(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAllUsers,
  loginUser,
  fetchUserById,
  createUser,
  modifyUserById,
  removeUserById,
};
