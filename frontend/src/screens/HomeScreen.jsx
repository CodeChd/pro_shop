// import {productsItems} from "../product"; // fake data
import { Row, Col } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

/////
// import { useEffect, useState } from "react"; redux will be used
// import axios from "axios"; redux will be used

// const [products, setProducts] = useState([]);

// useEffect(() => {
//   const fetchProducts = async () => {
//     const { data } = await axios.get("/api/products");
//     setProducts(data);
//   };

//   fetchProducts();
// }, []);
/////

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <div className="d-flex align-content-center " id="homeScreen">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError.data?.message || isError.error}
        </Message>
      ) : (
        <div className="d-block">
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
