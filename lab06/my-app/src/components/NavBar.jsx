import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavigationBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand><i class="bi bi-film"></i> Film Library</Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            data-bs-theme="light"
          />
          </Form>
          <Button><i class="bi bi-person-circle"></i></Button>
      </Container>
    </Navbar>
  );
}

export {NavigationBar};