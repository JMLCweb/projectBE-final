const { ObjectId } = require("mongodb");
const argon2 = require("argon2");
const connectToDB = require("./connectDB");

const addAdmin = async (admin) => {
  const { email, password, ...adminData } = admin;

  const db = await connectToDB();
  const adminCollection = db.collection("admin");

  const hash = await argon2.hash(password);
  const newAdmin = {
    ...adminData,
    email,
    password: hash,
    createdAt: new Date(),
  };

  const result = await adminCollection.insertOne(newAdmin);
  return { _id: result.insertedId, ...newAdmin };
};

const getAllAdmins = async () => {
  const db = await connectToDB();
  const adminCollection = db.collection("admin");
  return await adminCollection.find().toArray();
};

const getAdminById = async (id) => {
  const db = await connectToDB();
  const adminCollection = db.collection("admin");
  return await adminCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
};

const getAdminByEmail = async (email) => {
  const db = await connectToDB();
  const adminCollection = db.collection("admin");
  const admin = await adminCollection.findOne({ email });
  return admin;
};

const updateAdminById = async (id, admin) => {
  const db = await connectToDB();
  const adminCollection = db.collection("admin");

  if (admin.password) {
    admin.password = await argon2.hash(admin.password);
  }

  const result = await adminCollection.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    {
      $set: {
        ...admin,
        updatedAt: new Date(),
      },
    }
  );

  return result.matchedCount > 0;
};

const deleteAdminById = async (id) => {
  const db = await connectToDB();
  const adminCollection = db.collection("admin");
  const result = await adminCollection.deleteOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result.deletedCount > 0;
};

module.exports = {
  addAdmin,
  getAllAdmins,
  getAdminById,
  getAdminByEmail,
  updateAdminById,
  deleteAdminById,
};
