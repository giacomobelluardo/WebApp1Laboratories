import dayjs from 'dayjs';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'

function FilmForm(props){
  const [title, setTitle] = useState(props.film ? props.film.title : '');
  const [favorite, setFavorite] = useState(props.film ? props.film.favorite : false);
  const [date, setDate] = useState(props.film ? props.film.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
  const [score, setRating] = useState(props.film ? props.film.score : 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const film = {title, favorite, date, score};

    if(props.film) {
      props.updateFilm({id: props.film.id, ...film});
    }
    else {
      props.addFilm(film);
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>
          Title
        </Form.Label>
        <Form.Control type='text' required={true} minLength={2} value={title} onChange={(event)=>setTitle(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Check
            type="checkbox"
            id="checkboxId"
            label="it's one of my favorites"
            checked={favorite}
            onClick={(event)=>{setFavorite(event.target.value)}}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Date
        </Form.Label>
        <Form.Control type='date' value={date} onChange={(event)=>setDate(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
      <Form.Control as="select" custom value={score} onChange={(event) => setRating(event.target.value)}>
        {[...Array(6).keys()].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </Form.Control>
      </Form.Group>
      {props.mode==='add' && <Button variant='primary' type='Submit'>Add</Button>}
      {props.mode==='edit' && <Button variant='primary' type='Submit'>Edit</Button>}
      {' '}
      <Button variant='danger' onClick={props.cancel}>Cancel</Button>
    </Form>
  )
}

export {FilmForm};