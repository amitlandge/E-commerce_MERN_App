const Cart = require("../model/cartSchema");

const createCartItems = async (req, res) => {
  const { cartItems } = req.body;

  try {
    const { id } = req.user;
    const uid = id;
    const findUser = await Cart.findOne({ userId: uid });

    if (findUser) {
      const findAndUpdate = await Cart.findByIdAndUpdate(findUser._id, {
        userId: uid,
        cartItems: cartItems,
      });

      await findAndUpdate.save();
    } else {
      await Cart.create({
        userId: uid,
        cartItems: cartItems,
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getCartItems = async (req, res) => {
  try {
    const { id } = req.user;
    const getCart = await Cart.findOne({ userId: id });
    if (getCart) {
      res.status(200).json({
        success: true,
        cartItems: getCart,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
exports.createCartItems = createCartItems;
exports.getCartItems = getCartItems;
