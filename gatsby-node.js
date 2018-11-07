const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const filterProductSkus = (product, skus) => {
  return skus.filter(sku => sku.product === product.id);
};

exports.createPages = async ({ actions: { createPage } }) => {
  const allProducts = [];
  const allSkus = [];

  // Fetch all skus and add to sku list array
  await stripe.skus.list({ limit: 100 }).autoPagingEach(item => {
    allSkus.push(item);
  });

  // Fetch all products and add to product list
  await stripe.products
    .list({
      limit: 100
    })
    .autoPagingEach(item => {
      allProducts.push(item);
    });

  if (allProducts.length > 0) {
    // Create a single product page as the frontpage
    const product = allProducts[0];
    const productSkus = filterProductSkus(product, allSkus);

    createPage({
      path: `/`,
      component: require.resolve("./src/templates/product.js"),
      context: {
        product,
        productSkus
      }
    });

    if (allProducts.length > 1) {
      console.warn(
        "More than one product, time to create a different front page"
      );
    }
  } else {
    console.error("You need at least one product to build this site");
  }
};
