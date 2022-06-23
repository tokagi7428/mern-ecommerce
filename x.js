import Product from "./backend/models/productModel";

xRouter.get("/", async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || 3;
  const page = query.page || 1;
  const searchQuery = query.query || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const category = query.category || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};

  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { createdAt: -1 }
      : { _id: -1 };
  const products = await Product.find({
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
    ...queryFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  const countProducts = await Product.find({
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
    ...queryFilter,
  });
});
