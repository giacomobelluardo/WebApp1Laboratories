import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { Col, Container, Row } from 'react-bootstrap';
import {NavigationBar} from './components/NavBar'
import { SideBar } from './components/SideBar';
import {Film, FilmLibrary} from './filmLibrary.mjs'
import {Films} from './components/FilmComponents.jsx'
import { useState } from 'react';

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
  const [movies, setFilm] = useState(l1.allFilms());
  const [filter, setFilter] = useState('All');

  const changeFilter = (newFilter)=>{
    setFilter(newFilter)

    if(newFilter == 'All')
      setFilm(()=>l1.allFilms())
    if(newFilter == 'Favorites')
      setFilm(()=>l1.favoriteFilms())
    if(newFilter == 'Best rated')
      setFilm(()=>l1.bestFilms())
    if(newFilter == 'Seen Last Month')
      setFilm(()=>l1.monthFilm())
    if(newFilter == 'Unseen')
      setFilm(()=>l1.unseen())
  }

  return (
    <Container fluid className="p-0">
      <Container fluid className="p-0">
        <NavigationBar fluid/>
      </Container>
      <Container fluid className="p-0">
        <Row>
          <Col sm={3}>
            <SideBar filter={filter} changeFilter={changeFilter}/>
          </Col>
          <Col sm={9}>
            <Films allFilms={movies} filter={filter}></Films>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App
