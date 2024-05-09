import Container from 'react-bootstrap/Container';
import {Table, Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { FilmForm } from './FilmForm';


function Films(props) {
    const [mode, setMode] = useState('default');
    const [editableFilm, setEditableFilm] = useState();

    const handleEdit = (film) => {
      setEditableFilm(film);
      setMode('edit');
    }

    return (
      <>
        <Container fluid>
            <FilmTable films={props.allFilms} filter={props.filter} deleteFilm={props.deleteFilm} addFilm={props.addFilm} updateFilm={props.updateFilm} handleEdit={handleEdit}></FilmTable>
        </Container>
        {mode === 'add' &&
          <FilmForm
            mode = {mode}
            addFilm={(film) => {props.addFilm(film); setMode('default');}}
            cancel={() => setMode('default')}
          />
        }

        {mode === 'edit' &&
          <FilmForm
            mode={mode}
            film  ={editableFilm}
            cancel={() => setMode('default')}
            updateFilm={(film) => { props.updateFilm(film); setMode('default'); }}
          />
        }

        {mode === 'default' && <Button variant='primary' onClick={() => {setMode('add');}}><i className="bi bi-plus"></i></Button>} 
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
    return <td>
      <Button variant='warning'><i className='bi bi-pencil-square' onClick={() => { props.handleEdit(props.film) }}></i></Button> 
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
      {[...Array(props.rating)].map((i)=>{
        return(
          <i className="bi bi-star-fill"></i>
        );
      })}
      {[...Array(5-props.rating)].map((i)=>{
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