import { useState } from 'react';
import {Form, Button} from 'react-bootstrap'
import dayjs from 'dayjs';

function AnswerForm(props){

  //const [text, setText] = useState('');
  //const [email, setEmail] = useState('');
  //const [date, setDate] = useState('');

  // If the form is being displayed to edit a question (where props.answer is passed to the AnswerForm component [AnswerComponents.jsx: line 39]), the initial state of its fields is set to the values of the passed answer; otherwise, we initialize it as empty

  const [title, setTitle] = useState(props.film ? props.film.title : '');
  const [isFavorite, setFavorite] = useState(props.film ? props.films.isFavorite : false);
  const [date, setDate] = useState(props.film ? props.film.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
  const [score, setRating] = useState(props.film ? props.film.score : 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const film = {title, isFavorite, date, score};

    // Similarly, if the form is being displayed to edit a question (where props.answer is passed to the AnswerForm component [AnswerComponents.jsx: line 39]), we invoke updateAnswer; otherwise, we invoke addAnswer.
    
    if(props.film) {
      props.updateFilm({id: props.films.id, ...films});
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
        <Form.Control type='text' required={true} minLength={2} value={text} onChange={(event)=>setTitle(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          isFavorite
        </Form.Label>
        <Form.Control type='email' required={true} value={isFavorite} onChange={(event)=>setFavorite(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Date
        </Form.Label>
        <Form.Control type='date' value={date} onChange={(event)=>setDate(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>
          Rating
        </Form.Label>
        <Form.Control type='date' value={score} onChange={(event)=>setDate(event.target.value)}>
        </Form.Control>
      </Form.Group>
      <Button variant='danger' onClick={props.cancel}>Cancel</Button>
    </Form>
  )
}

export default AnswerForm;