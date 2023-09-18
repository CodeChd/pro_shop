import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Products = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to="">
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link className="text-black-50" to={`/product/${product._id}`}>
          <Card.Title className="product-title" as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price} </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
