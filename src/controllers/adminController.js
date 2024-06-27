const adminDB = require("../db/adminDB");
const argon2 = require("argon2");
const jwtService = require("../services/jwtService");

const createAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const existingAdmin = await adminDB.getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newAdmin = await adminDB.addAdmin(req.body);

    const token = jwtService.createToken(newAdmin._id, newAdmin.email);
    res.status(201).json({ admin: newAdmin, token });
  } catch (error) {
    res.status(500).json({ message: "Error on Register Admin" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await adminDB.getAdminByEmail(email);

    if (!result) {
      res.status(400).json({
        status: "error",
        message: "Admin not found",
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

    const token = jwtService.createToken(result._id, result.email, result.role);

    res.json({
      status: "ok",
      message: "Admin logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};

const fetchAllAdmins = async (req, res) => {
  try {
    const admins = await adminDB.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchAdminById = async (req, res) => {
  try {
    const admin = await adminDB.getAdminById(req.params.id);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.json(admin);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyAdminById = async (req, res) => {
  try {
    const admin = await adminDB.updateAdminById(req.params.id, req.body);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.json({ message: "Admin updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeAdminById = async (req, res) => {
  try {
    const admin = await adminDB.deleteAdminById(req.params.id);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.json({ message: "Admin deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  fetchAllAdmins,
  fetchAdminById,
  modifyAdminById,
  removeAdminById,
};
