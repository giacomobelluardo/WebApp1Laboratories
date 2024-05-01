import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavigationBar() {
  return (
    <Navbar expand="lg" bg='primary'>
      <Container fluid>
        <Navbar.Brand href="#" text='light-white'><i class="bi bi-film"></i> Film Library</Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          </Form>
      </Container>
    </Navbar>
  );
}

export {NavigationBar};