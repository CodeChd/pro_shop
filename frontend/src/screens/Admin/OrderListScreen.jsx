import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Paginate from "../../components/Paginate";
import { useParams } from "react-router-dom";

const OrderListScreen = () => {
  const { pageNumber } = useParams();

  console.log(pageNumber);

  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

  return (
    <>
      <h2>Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm my-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {!order.isPaid ? (
                    <FaTimes style={{ color: "red" }} />
                  ) : (
                    order.paidAt.substring(0, 10)
                  )}
                </td>
                <td>
                  {!order.isDelivered ? (
                    <FaTimes style={{ color: "red" }} />
                  ) : (
                    order.deliveredAt.substring(0, 10)
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="primary" outline="btn-block" className="">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <Paginate
          isAdmin={true}
          page={data.page}
          pages={data.pages}
          isOrderList={true}
        />
      )}
    </>
  );
};

export default OrderListScreen;
