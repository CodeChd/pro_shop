import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import FormContainer from "../../components/FormContainer";
import {
  useGetUserByIdQuery,
  useUpdateUserByidMutation,
} from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const { data: user, isLoading, refetch, error } = useGetUserByIdQuery(userId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const [updateUser, { isLoading: updateUserLoading, error: UserError }] =
    useUpdateUserByidMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success("User Updated");
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1> Edit </h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2 ">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2 ">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-2 ">
              <Form.Label>Admin</Form.Label>
              <Form.Check
                label="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="dark" className="my-2">
              Update
            </Button>
            {updateUserLoading && <Loader />}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
