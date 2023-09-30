// import {productsItems} from "../product"; // fake data
import { Row, Col } from "react-bootstrap";
import Products from "../components/Products";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

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
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <div className="d-flex flex-column  align-content-center " id="homeScreen">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to="/" className="align-self-start my-2 btn btn-dark">
              Go Back
            </Link>
          )}
          {!keyword ? (
            <h1>Latest Products</h1>
          ) : (
            <h1>Search results for {keyword}</h1>
          )}

          <Row> 
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
