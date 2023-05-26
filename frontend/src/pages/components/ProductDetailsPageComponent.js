import {
  Row,
  Col,
  Container,
  ListGroup,
  Button,
  Tab,
  Tabs,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-medium-image-zoom/dist/styles.css";
import FilterComponent from "../../components/filterQueryResultOptions/FilterComponent";
import BreadcrumbComponent from "../../components/filterQueryResultOptions/BreadcrumbComponent";
import "./SharedPages.css";
import QuotePriceComponent from "../../components/SendEmail/QuotePriceComponent";
import { connect } from "react-redux";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  getUser,
}) => {
  const { id } = useParams();
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [qty, setQty] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState("choose-product");
  const [selectedStock, setSelectedStock] = useState(null);

  const [userNameEmail, setUserNameEmail] = useState();

  // 当product state update的时候，重置一下setQty
  useEffect(() => {
    if (product.saleunit) {
      setQty(product.saleunit);
    }
  }, [product]);

  useEffect(() => {
    if (product.stock && product.stock.length === 1) {
      setSelectedProduct(product.stock[0].attrs);
      setSelectedStock(product.stock[0]);
    }
  }, [product]);

  function handleProductChange(event) {
    const attrs = event.target.value;
    setSelectedProduct(attrs);

    if (attrs !== "choose-product") {
      const stockItem = product.stock.find((item) => item.attrs === attrs);
      setSelectedStock(stockItem);
    } else {
      setSelectedStock(null);
    }
  }

  let stockCount = null;
  let stockPrice = null;
  let stockCode = null;

  if (selectedProduct !== "choose-product" && selectedStock) {
    stockCount = selectedStock.count;
    stockPrice = selectedStock.price;
    stockCode = selectedStock.ctlsku;
  }

  // console.log("selectedStock", selectedStock);

  // console.log(product.description);
  // const description[]=product.description.split('.');

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, qty, selectedStock));
    setShowCartMessage(true);
  };

  /*   let incNum = () => {
      if (qty > 0) {
        setQty(Number(qty) + 1);
      }
    };
    let decNum = () => {
      if (qty > 1) {
        setQty(qty - 1);
      }
    }; */

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setQty(product.saleunit);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, []);

  // 新的尺寸价格库存
  /*  const handleChangeAttr = (event) => {
    setSelectedAttrs(event.target.value); // Update the selected attribute when the user selects a different option
  }; */

  // 如果直接用toLocaleString() 报错的话，可能是value undefined了，那就format一下price， 然后再加上 toLocaleString
  const price = stockPrice;
  const formattedPrice = price ? price.toFixed(2).toLocaleString() : "";

  // const products = useSelector((state) => state.cart.value);

  // for the zoomable picture Gallery
  // const images = [];
  // if (product && product.images) {
  //   product.images.forEach((image) => {
  //     images.push({
  //       original: image.path,
  //       thumbnail: image.path,
  //     });
  //   });
  // }

  //react-image-lightbox -starts here
  const images = [];
  if (product && product.images) {
    product.images.forEach((image) => {
      images.push({
        original: image.path?.replace(/^http:/, "https:"),
        thumbnail: image.path?.replace(/^http:/, "https:"),
        url: image.path?.replace(/^http:/, "https:"),
        title: image.title,
        caption: image.name,
      });
    });
  }
  //react-image-lightbox -ends here

  // quote price using
  useEffect(() => {
    getUser()
      .then((data) => {
        setUserNameEmail({
          email: data.email,
          name: data.name,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const quotePriceData = {
    ...userNameEmail,
    productName: product.name,
    productId: id,
  };

  const handleBlur = (e) => {
    const newValue =
      Math.round(e.target.value / product.saleunit) * product.saleunit;
    setQty(newValue);
  };

  const [standard, setStandard] = useState([]);

  useEffect(() => {
    if (product?.standards) {
      if (product.standards.includes("/")) {
        const splittedStandards = product.standards.split("/");
        setStandard(splittedStandards);
      } else {
        setStandard([product.standards]);
      }
    }
  }, [product]);

  console.log("standard", standard);

  return (
    <Container className="ms-3 " fluid>
      <BreadcrumbComponent />
      <Row>
        <Col xxl={2} xl={3} lg={3} md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <FilterComponent />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xxl={10} xl={9} lg={9} md={9}>
          <AddedToCartMessageComponent
            showCartMessage={showCartMessage}
            setShowCartMessage={setShowCartMessage}
          />
          <Row className="mt-4 ">
            {/* ************   Filter, has removed, now just take 1 space  ***************  */}

            {/* ************   Product Pictures Display Carousel  ***************  */}
            <Col lg={4} className="m-1">
              {/* <Carousel>
            {product.images &&
              product.images.map((image, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <Image
                    crossOrigin="anonymous"
                    src={image.path ?? null}
                    fluid
                  />
                </div>
              ))}
          </Carousel> */}
              <ImageGallery items={images} />
            </Col>

            {/* ************   Product Details  ***************  */}
            <Col lg={6}>
              <Row>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2 className="text-uppercase">{product.name}</h2>

                    <div>
                      <label htmlFor="attrs">
                        Choose Product:&nbsp;&nbsp;&nbsp;{" "}
                      </label>
                      <select
                        id="product-select"
                        value={selectedProduct}
                        onChange={handleProductChange}
                      >
                        {product.stock &&
                          (product.stock.length === 1 ? (
                            <option value={product.stock[0].attrs}>
                              {product.stock[0].attrs}
                            </option>
                          ) : (
                            <>
                              <option value="choose-product">
                                <b>Choose Product</b>
                              </option>
                              {product.stock.map((stock) => (
                                <option key={stock.attrs} value={stock.attrs}>
                                  {stock.attrs}
                                </option>
                              ))}
                            </>
                          ))}
                      </select>

                      {stockCount !== null && (
                        <p>
                          Status:{" "}
                          {stockCount > 19 ? (
                            <i className="bi bi-circle-fill fw-bold text-success">
                              {" "}
                              in stock
                            </i>
                          ) : (
                            <i className="bi bi-circle-fill fw-bold text-warning">
                              {" "}
                              low stock
                            </i>
                          )}
                        </p>
                      )}
                    </div>
                    <br />
                    <Row hidden={selectedProduct === "choose-product"}>
                      <Col>
                        <h6>PRODUCT CODE : {stockCode}</h6>
                        <h6>
                          {price === 0 ? (
                            <span className="fw-bold PriceContact">
                              Contact us for a quote
                            </span>
                          ) : (
                            <span className="fw-bold">
                              Price: ${formattedPrice}
                            </span>
                          )}
                        </h6>
                        {/* <h6>
                          {
                            price === 0 ? (
                              <span className="fw-bold PriceContact">
                                Contact us for a quote
                              </span>
                            ) : (
                              <span className="fw-bold">
                                Price: ${formattedPrice}
                              </span>
                            )}
                        </h6> */}
                        <br />
                      </Col>
                    </Row>
                    {price === 0 ? null : <h6>Quantity :</h6>}

                    <Row>
                      {price === 0 ? (
                        <QuotePriceComponent quotePriceData={quotePriceData} />
                      ) : (
                        <>
                          <Col lg={3}>
                            <div
                              className="btn-group addToCartQty"
                              role="group"
                            >
                              {/* <button
                            type="button"
                            className="btn_jj"
                            onClick={decNum}
                          >
                            {" "}
                            -{" "}
                          </button> */}
                              <Form.Control
                                type="number"
                                min={product.saleunit}
                                className="form-control col-0"
                                value={qty}
                                onBlur={handleBlur}
                                onChange={(e) => setQty(e.target.value)}
                                step={product.saleunit}
                                disabled={selectedProduct === "choose-product"}
                              />

                              {/*                           <button
                            type="button"
                            className="btn_jj"
                            onClick={incNum}
                          >
                            {" "}
                            +{" "}
                          </button> */}
                            </div>
                          </Col>
                          &nbsp;&nbsp;
                          <Col lg={4}>
                            <Button
                              onClick={() => addToCartHandler(selectedStock)}
                              className="btn_blue btn-ripple addToCartBtn"
                              variant="success"
                              disabled={selectedProduct === "choose-product"}
                            >
                              Add to cart
                            </Button>
                          </Col>
                        </>
                      )}
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Row>

              {/* ************   Product details with download pdf  ***************  */}
              <Row>
                <Col className="mt-5">
                  <Container className="border border-light border-5" >
                    <Tabs
                      defaultActiveKey="Description"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3"
                    >
                      <Tab
                        className="m-3 col-md-12"
                        eventKey="Description"
                        title="Specifications"
                      >
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            textAlign: "left",
                            width: "97%",
                            overflowWrap: "break-word",
                          }}
                        >
                          {/* {product.description} */}
                          {product.description
                            ? product.description
                              .split("*")
                              .map((item, index) => {
                                return (
                                  index > 0 ? (
                                    <div key={index}>
                                      <span>* {item}</span>
                                    </div>

                                  ) : (
                                    <div key={index}>
                                      <span> {item}</span>
                                    </div>
                                  )

                                );
                              })
                            : ""}
                        </div>
                      </Tab>
                      {/* 看一下，如果pdfs 路径里面 没有值，就显示null，有的话，就map 一下 */}
                      {product.pdfs && product.pdfs.length > 0 ? (
                        <Tab eventKey="Download" title="Datasheet">
                          {product.pdfs &&
                            product.pdfs.map((pdf, idx) => {
                              const pdfName = pdf.path.split("/").pop(); // Get the file name from the path
                              return (
                                <div
                                  className="border border-light border-2 m-3 p-3"
                                  key={idx}
                                >
                                  <a
                                    href={pdf.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    {pdfName}
                                  </a>
                                </div>
                              );
                            })}
                        </Tab>
                      ) : null}
                      {/* Standards */}
                      {product.standards && product.standards.length > 0 ? (
                        <Tab eventKey="Standards" title="Standards">
                          <div className="border border-light border-2 m-3 p-3 d-flex justify-content-left">
                            {standard &&
                              standard.map((item, index) => {
                                return (
                                  <img
                                    key={index}
                                    src={`https://res.cloudinary.com/dxvwresim/image/upload/c_scale,h_120/STANDARDS/${item}.jpg`}
                                    target="_blank"
                                    alt=""
                                    style={{ maxWidth: "100%", height: "auto" }}
                                  />
                                );
                              })}
                          </div>
                        </Tab>
                      ) : null}
                    </Tabs>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default connect()(ProductDetailsPageComponent);
