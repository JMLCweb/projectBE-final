const { MongoClient, ObjectId } = require("mongodb");
const argon2 = require("argon2");

const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);

const connectToDB = async () => {
  try {
    await client.connect();
    const db = client.db("projectDB");
    return db.collection("admin");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database.");
  }
};

const addAdmin = async (admin) => {
  admin.role = "admin";

  const adminCollection = await connectToDB();

  const timestamp = new Date();

  const adminWithTimestamps = {
    ...admin,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await adminCollection.insertOne(adminWithTimestamps);
  return { _id: result.insertedId, ...admin };
};

const getAllAdmins = async () => {
  const adminCollection = await connectToDB();
  return await adminCollection.find().toArray();
};

const getAdminById = async (id) => {
  const adminCollection = await connectToDB();
  return await adminCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
};

const getAdminByEmail = async (email) => {
  const adminCollection = await connectToDB();
  return await adminCollection.findOne({ email });
};

const updateAdminById = async (id, admin) => {
  const adminCollection = await connectToDB();
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
  const adminCollection = await connectToDB();
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
