const { ObjectId } = require("mongodb");
const connectToDB = require("./connectDB");

const getCart = async (userId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({
    _id: ObjectId.createFromHexString(userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.cart;
};

const addToCart = async (userId, productId, quantity) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  // Verifica se o produto já está no carrinho
  const cartItemIndex = user.cart.findIndex((item) =>
    new ObjectId(item.productId).equals(new ObjectId(productId))
  );

  if (cartItemIndex !== -1) {
    // Produto já está no carrinho, retorna uma mensagem de erro
    throw new Error("Product is already in the cart");
  } else {
    // Adiciona um novo produto ao carrinho
    user.cart.push({ productId: new ObjectId(productId), quantity });
  }

  // Atualiza o carrinho do usuário no banco de dados
  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: user.cart } }
  );

  return user.cart;
};

const removeFromCart = async (userId, productId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  user.cart = user.cart.filter(
    (item) => !new ObjectId(item.productId).equals(new ObjectId(productId))
  );

  await usersCollection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { cart: user.cart } }
  );

  return user.cart;
};

const clearCart = async (userId) => {
  const db = await connectToDB();
  const usersCollection = db.collection("users");

  await usersCollection.updateOne(
    { _id: ObjectId.createFromHexString(userId) },
    { $set: { cart: [] } }
  );

  return [];
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
};
