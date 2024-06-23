const { ObjectId } = require("mongodb");
const argon2 = require("argon2");
const connectToDB = require("./connectDB");

const addUser = async (user) => {
  const { password, address, zipcode, ...otherUserData } = user;
  const hashedPassword = await argon2.hash(password);

  const newUser = {
    ...otherUserData,
    password: hashedPassword,
    address: address,
    zipcode: zipcode,
    cart: [],
    favorites: [],
    orders: [],
    role: "user",
    createdAt: new Date(),
  };

  const db = await connectToDB();
  const usersCollection = db.collection("users");
  const result = await usersCollection.insertOne(newUser);

  return { _id: result.insertedId, ...newUser };
};

const getUserByEmail = async (email) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne({ email });
  return user;
};

const getAllUsers = async () => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");
  return await usersCollection.find().toArray();
};

const getUserById = async (userId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");
  return await usersCollection.findOne({
    _id: ObjectId.createFromHexString(userId),
  });
};

const updateUserById = async (userId, user) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");
  if (user.password) {
    user.password = await argon2.hash(user.password);
  }
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        ...user,
        updatedAt: new Date(),
      },
    }
  );
  return result.matchedCount > 0;
};

const updateUserWithVerification = async (userId, user) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");
  try {
    const existingUser = await usersCollection.findOne({
      _id: ObjectId.createFromHexString(userId),
    });

    if (!existingUser) {
      return false;
    }

    const passwordMatch = await argon2.verify(
      existingUser.password,
      user.oldPassword
    );
    if (!passwordMatch) {
      return false;
    }

    if (user.password) {
      user.password = await argon2.hash(user.password);
    }
    const { oldPassword, ...updatedUserData } = user;

    const result = await usersCollection.updateOne(
      { _id: ObjectId.createFromHexString(userId) },
      {
        $set: {
          ...updatedUserData,
          updatedAt: new Date(),
        },
      }
    );

    return result.matchedCount > 0;
  } catch (error) {
    console.error("Error updating user with password verification:", error);
    throw new Error("Failed to update user with password verification.");
  }
};

const deleteUserById = async (id) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");
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
  updateUserWithVerification,
  deleteUserById,
  getUserByEmail,
};
