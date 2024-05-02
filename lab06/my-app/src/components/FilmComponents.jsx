import Container from 'react-bootstrap/Container';
import { Row, Col, Table, Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Films(props) {
    return (
      <>
        <Container fluid>
            <FilmTable films={props.allFilms} filter={props.filter}></FilmTable>
        </Container>
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
              props.films.map((f) => <FilmRow film={f} key={f.id} />)
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
        <FilmActions></FilmActions>
      </tr>
    );
  }
  
FilmRow.propTypes = {
    film: PropTypes.object,
}

function FilmActions() {
    return <td>
      <Button className='mx-1'><i className='bi bi-pencil-square'></i></Button> 
      <Button><i className='bi bi-trash'></i></Button>
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