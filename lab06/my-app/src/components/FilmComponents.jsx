import dayjs from 'dayjs';
import Container from 'react-bootstrap/Container';
import {Table, Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Films(props) {
    const [mode, setMode] = useState('default');
    const [editableFilm, setEditableFilm] = useState();

    const handleEdit = (film) => {
      setEditableFilm(film);
      setMode('edit');
    }

    const navigate = useNavigate();


    return (
      <>
        <Container fluid>
            <FilmTable films={props.allFilms} filter={props.filter} deleteFilm={props.deleteFilm} addFilm={props.addFilm} updateFilm={props.updateFilm} handleEdit={handleEdit}></FilmTable>
        </Container>
        <Button variant='primary' onClick={() => {setMode('add'); navigate('/add')}}><i className="bi bi-plus"></i></Button>
      </>
    );
}

Films.propTypes = {
    films: PropTypes.array
}

function FilmTable(props){
    return(
        <Table>
          <thead>
            <tr>
              <th>{props.filter}</th>
            </tr>
          </thead>
          <tbody>
            {
              props.films.map((f) => <FilmRow film={f} key={f.id} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} handleEdit={props.handleEdit}/>)
            }
          </tbody>
        </Table>
    );
}

FilmTable.propTypes = {
    films: PropTypes.array,
  }
  
function FilmRow(props) {
    return(
      <tr>
        <td>{props.film.title}</td>
        <FilmCheckBox boolVal={props.film.favorite}></FilmCheckBox>
        <td>{props.film.date.format('YYYY-MM-DD')}</td>
        <FilmRatings rating={props.film.score}></FilmRatings>
        <FilmActions deleteFilm={props.deleteFilm} id={props.film.id} handleEdit={props.handleEdit} film={props.film} ></FilmActions>
      </tr>
    );
  }
  
FilmRow.propTypes = {
    film: PropTypes.object,
}

function FilmActions(props) {
    const navigate = useNavigate();

    return <td>
      <Button variant='warning' onClick={() => { navigate(`edit/${props.id}`) }}><i className='bi bi-pencil-square'></i></Button> 
      <Button variant='danger' onClick={() => { props.deleteFilm(props.id) }}><i className='bi bi-trash'></i></Button>
    </td>
}

function FilmCheckBox(props){
  return <td>
    <Form>
      <Form.Check
        type="checkbox"
        checked={props.boolVal}
      />
    </Form>
    </td>
}

FilmCheckBox.propTypes = {
  boolVal: PropTypes.bool
}

function FilmRatings(props){
    return <td>
        {[...Array(parseInt(props.rating))].map((item)=>{
          return(
            <i className="bi bi-star-fill"></i>
          );
        })}
        {[...Array(5-parseInt(props.rating))].map((item)=>{
          return(
            <i className="bi bi-star"></i>
          );
        })}
      </td>
}

FilmRatings.propTypes = {
  rating: PropTypes.number
}
  
export {Films};