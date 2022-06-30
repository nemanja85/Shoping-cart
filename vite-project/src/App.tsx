import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Store } from './pages/Store';

function App() {
  return (
    <shoppingCartProvider>
      <Navbar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </Container>
      </Navbar>
    </shoppingCartProvider>
  );
}

export default App;
