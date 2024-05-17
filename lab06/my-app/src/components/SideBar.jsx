import ListGroup from 'react-bootstrap/ListGroup';
import {  Button } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';

function SideBar(props) {
  return (
    <ListGroup as="ul">
      <ListGroup.Item as="li">
        <Link to='/all'>
          <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('All')}}>All</Button>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Link to='/favorites'>
          <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('Favorites')}}>Favorites</Button>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Link to='/bestrated'>
          <Button variant='light' className='mx-1'onClick={()=>{props.changeFilter('Best rated')}}>Best rated</Button>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Link to='/seenlastmonth'>
          <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('Seen Last Month')}}>Seen Last Month</Button>
        </Link>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Link to='/unseen'>
          <Button variant='light' className='mx-1' onClick={()=>{props.changeFilter('Unseen')}}>Unseen</Button>
        </Link>
      </ListGroup.Item>
    </ListGroup>
  );
}

export {SideBar};