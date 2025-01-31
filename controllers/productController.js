const Product = require("../model/productSchema");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 6;
    const productsCountQuery = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    const productsCount = await productsCountQuery.query.countDocuments();

    const paginatedQuery = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(6);

    const paginatedProducts = await paginatedQuery.query;

    const totalPages = Math.ceil(productsCount / 6);

    res.status(200).json({
      message: "Get All Product Controller",
      products: paginatedProducts,
      resultPerPage,
      productsCount: productsCount,
      totalPages,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    let images = [];
    if (!req.files.image) {
      throw new Error("Please Insert Image");
    }
    if (req.files.image.length > 0) {
      images.push(...req.files.image);
    } else {
      images = [req.files.image];
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(
        images[i].tempFilePath,
        {
          folder: "products",
        }
      );

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.image = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product Not found");
    }

    if (req.files !== null) {
      let images = [];
      if (req.files.image.length > 0) {
        images.push(...req.files.image);
      } else {
        images = [req.files.image];
      }

      const imagesLinks = [];

      if (images !== undefined) {
        // Deleting Images From Cloudinary

        for (let i = 0; i < product.image.length; i++) {
          await cloudinary.v2.uploader.destroy(product.image[i].public_id);
        }

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(
            images[i].tempFilePath,
            {
              folder: "products",
            }
          );

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        req.body.image = imagesLinks;
        req.body.user = req.user.id;

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json({
          message: "Succesfully Updated",
          product,
        });
      }
    } else {
      product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product Not found");
    }

    if (product) {
      for (const key in product.image) {
        await cloudinary.v2.uploader.destroy(product.image[key].public_id);
      }
    }
    product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product Not found");
    }
    res.status(200).json({
      message: "Single Product",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const adminAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
};

const reviewsProduct = async (req, res) => {
  const { _id } = req.user;
  const { rating, comment, productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product Id Is Wrong");
  }
  const isReviewed = product.reviews.find((item) => {
    return item.user.toString() === _id.toString();
  });
  if (isReviewed) {
    product.reviews.forEach((item) => {
      if (item.user.toString() === _id.toString()) {
        (item.rating = rating), (item.comment = comment);
      }
    });
  } else {
    product.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
    });
    product.numberOfReviews = product.reviews.length;
  }
  let average = 0;
  product.reviews.forEach((rev) => {
    return (average += rev.rating);
  });
  product.rating = average / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    message: "Successs",
    product,
  });
};
const getAllReviews = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (product) {
    res.status(200).json({
      Review: product.reviews,
    });
  }
};
const deleteReview = async (req, res) => {
  const product = await Product.findById(req.query.productId);
  if (product) {
    let review = product.reviews.filter((rev) => {
      return rev._id.toString() !== req.query.id.toString();
    });
    let average = 0;
    review.forEach((rev) => {
      return (average += rev.rating);
    });

    let rating = 0;

    if (review.length === 0) {
      rating = 0;
    } else {
      rating = average / review.length;
    }
    let numberOfReviews = review.length;
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews: review,
        rating,
        numberOfReviews,
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );
    console.log(review);

    res.status(200).json({
      success: true,
    });
  }
};
exports.getAllProducts = getAllProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getSingleProduct = getSingleProduct;
exports.adminAllProducts = adminAllProducts;
exports.reviewsProduct = reviewsProduct;
exports.getAllReviews = getAllReviews;
exports.deleteReview = deleteReview;
