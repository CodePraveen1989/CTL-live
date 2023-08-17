const Product = require("../models/ProductModel");
const recordsPerPage = require("../config/pagination");
const imageValidate = require("../utils/imageValidate");
const pdfValidate = require("../utils/pdfValidate");

const getCombinations = (array, length) => {
  let result = [];
  const f = (active, rest, length) => {
    if (!active.length && !rest.length) return;
    if (active.length === length) {
      result.push(active);
    } else {
      if (rest.length) {
        f(active.concat(rest[0]), rest.slice(1), length);
        f(active, rest.slice(1), length);
      }
    }
  };
  f([], array, length);
  return result;
};

const getProducts = async (req, res, next) => {
  try {
    let query = {};
    let queryCondition = false;
    let priceQueryCondition = {};
    // 如果query price存在，就pass小于等于XXX
    if (req.query.price) {
      queryCondition = true;
      // Mongodb比较查询： $lt < ； $lte <= ; $gt > ; $gte >=
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }

    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      // $in 范围内 $nin $ne != not equal
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    // 好像这个里面的所有 categoryQueryCondition 都是给 123级路由用的，现在我们用的是 query string，所以也许用不到了？
    let categoryQueryCondition = {};
    // 这个categoryName就是从productRoutes里面抄来的, 因为我们在 二级路由里面写的是 categoryName 所以这里params里面解析的就是 categoryName
    const categoryName = req.params.categoryName || "";
    //100章，从all下拉栏选择categories并search， 因为 下拉里面的格式是： PPE/XXXX 所以可以这么用， 然后可以用到所有的 PPE/XXX/XXX
    // 如果categoryName 是 true，则queryCondition 就 true （好像这里的categoryName可以带上subcategory）
    if (categoryName) {
      queryCondition = true;
      // 用, 去replace所有的/
      let a = categoryName.replace(/,/g, "/");
      // for searching，需要 regular expression(正则表达式)，可以从^PPE/XXX开始search 就比较快了
      // 新搞得一个subcategories用的，设置正则表达为null，然后再写入值
      var regEx = null;
      // 我们这里的 subCategoryName 是在frontend Productlistpagecomponent里面新设置的subcategories的变量，因为是存到了query里面，所以consolelog queryd的话，可以看到
      // 其实这里的 subCategoryName 和 childCategoryName 是从 route里面解析的，存在了params里的， 所以可以 req.query.XXX 来读取，并赋值
      var subCategoryName = req.query.subCategoryName;
      var childCategoryName = req.query.childCategoryName;
      var fourCategoryName = req.query.fourCategoryName;
      console.log("fffff:", childCategoryName);

      // 这里是表示如果，subCategoryName有值就返回 a +  subCategoryName ，因为a是maincategory 所以 要加上 subCategoryName 这个subcategories，来组成新的正则表达
      if (fourCategoryName) {
        regEx = new RegExp(
          "^" +
          a +
          "/" +
          subCategoryName +
          "/" +
          childCategoryName +
          "/" +
          fourCategoryName
        );
      } else if (childCategoryName) {
        regEx = new RegExp(
          "^" + a + "/" + subCategoryName + "/" + childCategoryName
        );
      } else if (subCategoryName) {
        regEx = new RegExp("^" + a + "/" + subCategoryName);
      } else {
        regEx = new RegExp("^" + a);
      }
      // 在这儿console.log一下， 看一下正则表达式
      console.log("xxx:", regEx);
      categoryQueryCondition = { category: regEx };
    }

    let brandQueryCondition = {};
    const brandName = req.params.brandName || "";

    if (brandName) {
      queryCondition = true;
      // Use - to replace all ,
      let a = brandName.replace(/,/g, "-");
      // var regEx = new RegExp("^" + a); //敏感匹配
      var regEx = new RegExp(a, "i"); // 不敏感匹配
      brandQueryCondition = { supplier: regEx };
    }



    let attrsQueryCondition = [];
    if (req.query.attrs) {
      // attrs=RAM-1TB-2TB-4TB,color-blue-red
      // [ 'RAM-1TB-4TB', 'color-blue', '' ] 这里需要 turn this string into such larray
      // RAM 是key，1TB 4TB是values
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift(); // removes first item
          let a1 = {
            // a[0] 是key，RAM or Color
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          // console.dir(acc, { depth: null })
          return acc;
        } else return acc;
      }, []);
      //   console.dir(attrsQueryCondition, { depth: null });
      queryCondition = true;
    }

    //pagination
    // 如果pageNum不exist，就assign 1 to page Number
    const pageNum = Number(req.query.pageNum) || 1;
    console.log(req.query.pageNum);

    // sort by name, price etc.
    let sort = {};
    // sortOption request query sort or empty string
    const sortOption = req.query.sort || "";
    if (sortOption) {
      // 在Ftend的sortoptioncomponent里，option下拉菜单里，设置了value值：price_1等，来进行排序，所以此处调用并更改， overwrite it
      let sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }

    /* ******* search function ******* */

    // 第七版 searchQuery
    const searchQuery = req.params.searchQuery || "";
    let searchQueryCondition = {};
    let select = {};
    console.log("我是searchQuery", searchQuery);

    const performSearch = async (query) => {
      const searchWords = query.searchQuery.split(" ");

      if (searchWords.length <= 1) {
        return {
          $text: {
            $search: query.searchQuery,
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        };
      } else {
        const searchPattern = searchWords.map(word => `(?=.*${word})`).join("") + ".*";
        const searchQueryCondition = {
          name: {
            $regex: searchPattern,
            $options: "i",
          },
        };

        const tempProducts = query.productIds.length > 0 ? await Product.find({ _id: { $in: query.productIds }, ...searchQueryCondition }) : await Product.find(searchQueryCondition);
        if (tempProducts.length > 0) {
          return searchQueryCondition;
        } else {
          return null;
        }
      }
    };

    const performIndividualSearches = async (searchWords, productIds) => {
      const searchConditions = searchWords.map(word => ({
        name: {
          $regex: word,
          $options: "i",
        },
      }));

      const query = productIds.length > 0 ? { _id: { $in: productIds }, $or: searchConditions } : { $or: searchConditions };

      const products = await Product.find(query);
      return products;
    };

    if (searchQuery) {
      queryCondition = true;
      const searchWords = searchQuery.split(" ");

      let categoryMatchedProducts = [];
      const filteredSearchWords = searchWords.filter((word) => word.length > 1);

      for (const word of filteredSearchWords) {
        const regex = new RegExp(`${word}s?`, "i");
        const categoryMatch = await Product.find({
          category: {
            $regex: regex,
          },
        });
        categoryMatchedProducts = categoryMatchedProducts.concat(categoryMatch);
        console.log("categoryMatch是啥？", categoryMatchedProducts.length);
      }

      const productIds = categoryMatchedProducts.map(p => p._id);

      if (categoryMatchedProducts.length > 0) {
        searchQueryCondition = await performSearch({ searchQuery, productIds });

        if (searchQueryCondition === null) {
          const products = await performIndividualSearches(filteredSearchWords, productIds);
          searchQueryCondition = { _id: { $in: products.map(p => p._id) } };
        } else {
          searchQueryCondition = { _id: { $in: productIds }, ...searchQueryCondition };
        }
      } else {
        searchQueryCondition = await performSearch({ searchQuery, productIds: [] });

        if (searchQueryCondition === null) {
          const products = await performIndividualSearches(filteredSearchWords, []);
          searchQueryCondition = { _id: { $in: products.map(p => p._id) } };
        }
      }
    }

    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          brandQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }
    // name:1 一指的是 ascending order。 -1指descending order
    // 后面的limit（1）是：only one product fetched from the database. and this limit will be needed for pagination.
    // recordsPerPager 在config里有设置数字，就是每页显示几个product
    // 下面的skip（2）是指，first 2 records were skipped,然后算一下每个page显示的东西

    // const sortCriteria = { category: 1 };
    const sortCriteria = [
      ["category", 1],
      ["material", 1],
      ["width", 1],
      ["length", 1],
      ["thickness", 1],
      ["name", 1],
      ["displayPrice", 1],
    ];
    const totalProducts = await Product.countDocuments(query);
    let products = await Product.find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sortCriteria)
      .limit(recordsPerPage);

    /*     if (searchQuery) {
          const searchWords = searchQuery.split(" ");
          products = products.sort((a, b) => {
            const aMatchCount = searchWords.filter((word) =>
              a.name.toLowerCase().includes(word.toLowerCase())
            ).length;
            const bMatchCount = searchWords.filter((word) =>
              b.name.toLowerCase().includes(word.toLowerCase())
            ).length;
            return bMatchCount - aMatchCount;
          });
        } */

    //  Math.ceil (x) 返回不小于x的最接近的整数
    res.json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
    console.log(pageNum);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    // populate("reviews") 就把reviews展开了，并不仅仅显示reviews的ID
    const product = await Product.findById(req.params.id)
      /* .populate("reviews") */
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const adminGetProducts = async (req, res, next) => {
  try {
    // 设置了sort by category，然后下面括号里选择了，get哪些数据
    const products = await Product.find({})
      .sort({ ctlsku: 1 })
      .select(
        "name category stock.price stock.ctlsku stock.count stock.slrsku stock.attrs stock.barcode"
      );
    return res.json(products);
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    await product.remove();
    res.json({ message: "product removed" });
  } catch (err) {
    next(err);
  }
};

/* const adminDeleteProductAttr = async (req, res) => {
  try {
    const { id, stockId } = req.params;
    // find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    // find the stock object by ID
    const stockIndex = product.stock.findIndex(stock => String(stock._id) === stockId);
    if (stockIndex === -1) {
      return res.status(404).send({ error: 'Stock object not found' });
    }
    // remove the stock object from the array
    product.stock.splice(stockIndex, 1);
    // save the updated product
    await product.save();
    res.send(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: 'Server error' });
  }
}; */

/* const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const {
      name,
      description,
      count,
      saleunit,
      max,
      price,
      purchaseprice,
      slrcurrentbuyingprice,
      slrsku,
      ctlsku,
      suppliersku,
      supplier,
      category,
      attributesTable,
    } = req.body;

    product.name = name;
    product.description = description;
    product.count = count;
    product.saleunit = saleunit;
    product.max = max;
    product.price = price;
    product.purchaseprice = purchaseprice;
    product.slrcurrentbuyingprice = slrcurrentbuyingprice;
    product.slrsku = slrsku;
    product.ctlsku = ctlsku;
    product.suppliersku = suppliersku;
    product.supplier = supplier;
    product.category = category;

    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();

    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
}; */

const adminCreateProduct = async (req, res, next) => {
  try {
    const product = new Product();
    const {
      name,
      description,
      saleunit,
      max,
      purchaseprice,
      slrcurrentbuyingprice,
      supplier,
      category,
      attributesTable,
      stock,
      standards
    } = req.body;

    product.name = name;
    product.description = description;
    product.saleunit = saleunit;
    product.max = max;
    product.purchaseprice = purchaseprice;
    product.slrcurrentbuyingprice = slrcurrentbuyingprice;
    product.supplier = supplier;
    product.category = category;
    product.category = standards || "";
    if (stock.length > 0) {
      product.stock = [];
      stock.map((item) => {
        const { attrs, count, price, barcode, ctlsku, slrsku, suppliersku } =
          item;
        product.stock.push({
          attrs: attrs || "",
          count: count || 0,
          price: price || 0,
          barcode: barcode || "",
          ctlsku: ctlsku || "",
          slrsku: slrsku || "",
          suppliersku: suppliersku || "",
        });
      });
    } else {
      product.stock = [];
    }

    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();

    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

/* const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const {
      name,
      description,
      count,
      min,
      max,
      price,
      purchaseprice,
      slrcurrentbuyingprice,
      slrsku,
      ctlsku,
      suppliersku,
      supplier,
      category,
      attributesTable,
    } = req.body;
    // || or 如果name from request body is empty， then product name the same value
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.saleunit = saleunit || product.saleunit;
    product.max = max || product.max;
    product.price = price || product.price;
    product.purchaseprice = purchaseprice || product.purchaseprice;
    product.slrcurrentbuyingprice =
      slrcurrentbuyingprice || product.slrcurrentbuyingprice;
    product.slrsku = slrsku || product.slrsku;
    product.ctlsku = ctlsku || product.ctlsku;
    product.suppliersku = suppliersku || product.suppliersku;
    product.supplier = supplier || product.supplier;
    product.category = category || product.category;

    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save(); 
    res.json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
}; */

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const {
      name,
      description,
      supplier,
      RRP,
      category,
      images,
      pdfs,
      purchaseprice,
      slrcurrentbuyingprice,
      saleunit,
      max,
      stock,
      standards
    } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.supplier = supplier || product.supplier;
    product.RRP = RRP || product.RRP;
    product.category = category || product.category;
    product.images = images || product.images;
    product.pdfs = pdfs || product.pdfs;
    product.purchaseprice = purchaseprice || product.purchaseprice;
    product.slrcurrentbuyingprice =
      slrcurrentbuyingprice || product.slrcurrentbuyingprice;
    product.saleunit = saleunit || product.saleunit;
    product.max = max || product.max;
    product.standards = standards || product.standards;
    if (stock.length > 0) {
      product.stock = [];
      stock.map((item) => {
        const { attrs, count, price, barcode, ctlsku, slrsku, suppliersku } =
          item;
        product.stock.push({
          attrs: attrs || "",
          count: count || 0,
          price: price || 0,
          barcode: barcode || "",
          ctlsku: ctlsku || "",
          slrsku: slrsku || "",
          suppliersku: suppliersku || "",
        });
      });
    } else {
      product.stock = [];
    }
    await product.save();
    res.json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};

const adminUpload = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let product = await Product.findById(req.query.productId).orFail();
      product.images.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return;
  }
  try {
    // 如果nothing in req.files ；  ！！非空判断
    if (!req.files || !!req.files.images === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResultImage = imageValidate(req.files.images);
    if (validateResultImage.error) {
      return res.status(400).send(validateResultImage.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectoryImage = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    );

    let product = await Product.findById(req.query.productId).orFail();

    // iamge
    let imagesTable = [];
    if (Array.isArray(req.files.images)) {
      imagesTable = req.files.images;
    } else {
      imagesTable.push(req.files.images);
    }

    for (let image of imagesTable) {
      var fileName = uuidv4() + path.extname(image.name);
      var uploadPath = uploadDirectoryImage + "/" + fileName;
      product.images.push({ path: "/images/products/" + fileName });
      image.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

// PDFs
const adminUploadPdf = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      let product = await Product.findById(req.query.productId).orFail();
      product.pdfs.push({ path: req.body.url });
      await product.save();
    } catch (err) {
      next(err);
    }
    return;
  }
  try {
    if (!req.files || !!req.files.pdfs === false) {
      return res.status(400).send("No files were uploaded.");
    }

    const validateResultPdf = pdfValidate(req.files.pdfs);
    if (validateResultPdf.error) {
      return res.status(400).send(validateResultPdf.error);
    }

    const path = require("path");
    const { v4: uuidv4 } = require("uuid");
    const uploadDirectoryPdf = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "documents"
    );

    let product = await Product.findById(req.query.productId).orFail();
    let pdfsTable = [];
    if (Array.isArray(req.files.pdfs)) {
      pdfsTable = req.files.pdfs;
    } else {
      pdfsTable.push(req.files.pdfs);
    }

    for (let pdf of pdfsTable) {
      // 下面这个是用uuidv4 来随机命名，然后path.extname(pdf.name)是取 .pdf ， 用来拼接成一个随机生成的字符串+.pdf构成文件名
      // 再后面的两个 pdf.name 原本应该是 fileName的，但是这里我需要让文件名直接显示，所以就换掉了
      // var fileName = uuidv4() + path.extname(pdf.name);
      var uploadPath = uploadDirectoryPdf + "/" + pdf.name;
      console.log(pdf);
      product.pdfs.push({ path: "/images/documents/" + pdf.name });
      pdf.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("Files uploaded!");
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);
  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { images: { path: imagePath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  try {
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

const adminDeleteProductPdf = async (req, res, next) => {
  const pdfPath = decodeURIComponent(req.params.pdfPath);
  if (req.query.cloudinary === "true") {
    try {
      await Product.findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { pdfs: { path: pdfPath } } }
      ).orFail();
      return res.end();
    } catch (er) {
      next(er);
    }
    return;
  }
  try {
    const path = require("path");
    const finalPath = path.resolve("../frontend/public") + pdfPath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { pdfs: { path: pdfPath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminUploadPdf,
  adminDeleteProductImage,
  adminDeleteProductPdf,
};
