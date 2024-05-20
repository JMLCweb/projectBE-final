const { MongoClient, ObjectId } = require("mongodb");
const argon2 = require("argon2");

const mongoUrl = process.env.MONGO_URL;
let client;

const connectToDB = async () => {
  if (!client || !client.topology || client.topology.isDestroyed()) {
    client = new MongoClient(mongoUrl);
    await client.connect();
  }
  return client.db("projectDB");
};

const getUsersCollection = async () => {
  const db = await connectToDB();
  return db.collection("users");
};

const getAllUsers = async () => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.find().toArray();
};

const getUserById = async (id) => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.findOne({ _id: new ObjectId(id) });
};

const getUserByEmail = async (email) => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.findOne({ email });
};

const addUser = async (user) => {
  user.cart = []; // Inicialize o carrinho do usuário

  try {
    user.password = await argon2.hash(user.password); // Criptografa a senha com Argon2
  } catch (error) {
    throw new Error("Error encrypting password");
  }

  const usersCollection = await getUsersCollection();
  const result = await usersCollection.insertOne(user);
  return { _id: result.insertedId, ...user }; // Retorna o usuário com o ID inserido
};

const updateUserById = async (id, user) => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: user }
  );
  return result.matchedCount > 0;
};

const deleteUserById = async (id) => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
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
