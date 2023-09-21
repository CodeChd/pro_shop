import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductsDetailQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";

/// redux will be used
// import { useEffect, useState } from "react";
// import axios from "axios";

// const [product, setProducts] = useState([]);
// useEffect(() => {
//   const fetchProducts = async () => {
//     const { data } = await axios.get(`/api/products/${productId}`);
//     setProducts(data);
//   };

//   fetchProducts();
// }, [productId]);
////

const ProductScreen = () => {
  //item id
  const { id: productId } = useParams();

  //actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //qty state
  const [qty, setQty] = useState(1);

  //fetch products from redux
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductsDetailQuery(productId);

  //add qty
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="d-flex align-content-center g-3 " id="homeScreen">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error}
        </Message>
      ) : (
        <div className="">
          <Link className="btn btn-light my-3" to="/">
            Go back
          </Link>

          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty.</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      variant="dark"
                      disabled={product.countInStock === 0}
                      className=" btn-block"
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
