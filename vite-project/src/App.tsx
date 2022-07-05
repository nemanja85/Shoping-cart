import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Store } from './pages/Store';

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </Container>
      </Navbar>
    </ShoppingCartProvider>
  );
}

export default App;
