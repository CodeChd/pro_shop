import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder="false" />
      <main className="my-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
