import { Row, Col } from "react-bootstrap";
import {productsItems} from "../product";
import Products from "../components/Products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {productsItems.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product}/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
