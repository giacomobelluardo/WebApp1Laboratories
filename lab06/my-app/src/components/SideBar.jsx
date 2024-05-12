import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Col, Table, Button } from 'react-bootstrap';

function SideBar(props) {
  return (
    <ListGroup as="ul">
      <ListGroup.Item as="li">
        <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('All')}}>All</Button>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('Favorites')}}>Favorites</Button>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Button variant='light' className='mx-1'onClick={()=>{props.changeFilter('Best rated')}}>Best rated</Button>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('Seen Last Month')}}>Seen Last Month</Button>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('Unseen')}}>Unseen</Button>
      </ListGroup.Item>
    </ListGroup>
  );
}

export {SideBar};