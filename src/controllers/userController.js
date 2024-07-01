const usersDB = require('../db/usersDB');
const jwtService = require('../services/jwtService');
const argon2 = require('argon2');

const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await usersDB.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const newUser = await usersDB.addUser(req.body);

    const token = jwtService.createToken(
      newUser._id,
      newUser.email,
      newUser.role
    );

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Error Register User' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersDB.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = jwtService.createToken(user._id, user.email, user.role);

    res.json({
      status: 'ok',
      message: 'User logged in',
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await usersDB.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting Users' });
  }
};

const fetchUserById = async (req, res) => {
  try {
    const user = await usersDB.getUserById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting User' });
  }
};

const modifyUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const updated = await usersDB.updateUserById(userId, req.body);
    if (!updated) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'User Update Error' });
  }
};

const modifyUserWithVerification = async (req, res) => {
  try {
    const updated = await usersDB.updateUserWithVerification(
      req.params.userId,
      req.body
    );
    if (!updated) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'User Update Error' });
  }
};

const removeUserById = async (req, res) => {
  try {
    const deleted = await usersDB.deleteUserById(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

module.exports = {
  createUser,
  loginUser,
  fetchAllUsers,
  fetchUserById,
  modifyUserById,
  modifyUserWithVerification,
  removeUserById,
};
