import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Container } from "react-bootstrap";


function App() {
  return (      
    <>
      <Header />
      <main className="my-3">
        <Container>
            <Outlet/>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
