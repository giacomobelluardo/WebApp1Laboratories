import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { Col, Container, Row } from 'react-bootstrap';
import {NavigationBar} from './components/NavBar'
import { SideBar } from './components/SideBar';
import {Film, FilmLibrary} from './filmLibrary.mjs'
import {Films} from './components/FilmComponents.jsx'

//Library of films
const f1 = new Film(1, 'Pulp fiction', true, dayjs('2024-03-14'), 3, 1);
const f2 = new Film(2, 'Taxi Driver', false, dayjs('2024-03-11'), 4, 1);
const f3 = new Film(3, 'Star Wars', true, dayjs('2024-02-12'), 5, 1);

const l1 = new FilmLibrary();

l1.addFilm(f1);
l1.addFilm(f2);
l1.addFilm(f3);

//APP
function App() {
  return (
    <Container fluid>
      <NavigationBar/>
      <Container fluid>
        <Row>
          <Col sm={4}>
            <SideBar/>
          </Col>
          <Col sm={8}>
            <Films allFilms={l1.allFilms()}></Films>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App
