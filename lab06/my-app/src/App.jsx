import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import { Col, Container, Row, Button } from 'react-bootstrap';
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
  let initialFilms = l1.allFilms();
  const [movies, setFilm] = useState(l1.allFilms());
  const [filter, setFilter] = useState('All');

  const changeFilter = (newFilter)=>{
    setFilter(newFilter)

    if(newFilter == 'All')
      setFilm(()=>initialFilms)
    if(newFilter == 'Favorites')
      setFilm(()=>initialFilms.filter(f=>f.favorite))
    if(newFilter == 'Best rated')
      setFilm(()=>initialFilms.filter(f=>f.score==5))
    if(newFilter == 'Seen Last Month')
      setFilm(()=>initialFilms.filter(f=>f.date.month() == dayjs().format('YYYY-MM-DD').month()))
    if(newFilter == 'Unseen')
      setFilm(()=>initialFilms.filter(f => !f.date))
  }

  const deleteFilm = (id) => {
    initialFilms = initialFilms.filter((a)=>(a.id != id))
    setFilm(oldFilms => oldFilms.filter((a) => (a.id != id)))
  }

  const addFilm = (film) => {
    setFilm((oldFilms) => {
      const newId = Math.max(...oldFilms.map(film => film.id)) + 1;
      const newFilm = new Film(newId, film.title, film.favorite, film.date, film.score, 1);
      initialFilms.push(newFilm);
      return [...oldFilms, newFilm];
    })
  }

  const updateFilm = (film) => {
    setFilm(oldFilms => {
      return oldFilms.map((movie) => {
        if(movie.id === film.id) {
          return new Film(film.id, film.title, film.favorite, film.date, film.score);
        }
        else
          return movie;
      });
    });
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
            <Films allFilms={movies} filter={filter} deleteFilm={deleteFilm} addFilm={addFilm} updateFilm={updateFilm}></Films>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App
