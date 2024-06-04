const {
  addAdmin,
  getAllAdmins,
  getAdminById,
  getAdminByEmail,
  updateAdminById,
  deleteAdminById,
} = require("../db/adminDB");
const argon2 = require("argon2");
const jwtService = require("../services/jwtService");

const fetchAllAdmins = async (req, res) => {
  try {
    const admins = await getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await getAdminByEmail(email);

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

    const token = jwtService.createToken(result._id, result.email);

    res.json({
      status: "ok",
      message: "Admin logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchAdminById = async (req, res) => {
  try {
    const admin = await getAdminById(req.params.id);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.json(admin);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hash = await argon2.hash(password);
    const newAdmin = await addAdmin({
      ...req.body,
      password: hash,
    });

    const token = jwtService.createToken(newAdmin._id, newAdmin.email);
    const tokenExpiration = jwtService.getTokenExpirationDate();
    res.status(201).json({ admin: newAdmin, token, tokenExpiration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modifyAdminById = async (req, res) => {
  try {
    const updated = await updateAdminById(req.params.id, req.body);
    if (!updated) {
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
    const deleted = await deleteAdminById(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.json({ message: "Admin deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAllAdmins,
  loginAdmin,
  fetchAdminById,
  createAdmin,
  modifyAdminById,
  removeAdminById,
};
