import ListGroup from 'react-bootstrap/ListGroup';

function SideBar() {
  return (
    <ListGroup as="ul">
      <ListGroup.Item as="li" action href="#link1">
        All
      </ListGroup.Item>
      <ListGroup.Item as="li" action href="#link1">Favorites</ListGroup.Item>
      <ListGroup.Item as="li" action href="#link1">
        Best Rated
      </ListGroup.Item>
      <ListGroup.Item as="li" action href="#link1">Seen Last Month</ListGroup.Item>
      <ListGroup.Item as="li" action href="#link1">Unseen</ListGroup.Item>
    </ListGroup>
  );
}

export {SideBar};