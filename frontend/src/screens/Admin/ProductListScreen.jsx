import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const {
    data,
    isLoading,
    error,
    refetch: refetchProducts,
  } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingProduct, error: productError }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deleteLoading, refetch }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this product")) {
      try {
        const res = await deleteProduct(id).unwrap();
        toast.success(res.message);
        refetchProducts();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const addProductHandler = async () => {
    if (confirm("Are you sure you want create a new product")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center ">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={addProductHandler} className="btn-sm m-3">
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm my-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => deleteHandler(product._id)}
                      variant="danger"
                      className="btn-sm "
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate isAdmin={true} page={data.page} pages={data.pages}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
