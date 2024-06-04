const { MongoClient, ObjectId } = require("mongodb");

const mongoUrl = process.env.MONGO_URL;
const client = new MongoClient(mongoUrl);

const connectToDB = async () => {
  try {
    await client.connect();
    const db = client.db("projectDB");
    return db.collection("users");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database.");
  }
};

const addUser = async (user) => {
  user.cart = [];
  user.role = "customer";

  const usersCollection = await connectToDB();

  const timestamp = new Date();

  const usersWithTimestamps = {
    ...user,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const result = await usersCollection.insertOne(usersWithTimestamps);
  return { _id: result.insertedId, ...user };
};

const getAllUsers = async () => {
  const usersCollection = await connectToDB();
  return await usersCollection.find().toArray();
};

const getUserById = async (id) => {
  const usersCollection = await connectToDB();
  return await usersCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
};

const getUserByEmail = async (email) => {
  const usersCollection = await connectToDB();
  const user = await usersCollection.findOne({ email });
  return user;
};

const updateUserById = async (id, user) => {
  const usersCollection = await connectToDB();
  const result = await usersCollection.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    {
      $set: {
        ...user,
        updatedAt: new Date(),
      },
    }
  );
  return result.matchedCount > 0;
};

const deleteUserById = async (id) => {
  const usersCollection = await connectToDB();
  const result = await usersCollection.deleteOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result.deletedCount > 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  getUserByEmail,
};
