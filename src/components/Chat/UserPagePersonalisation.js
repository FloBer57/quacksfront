import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const UserPagePersonalisation = ({ person }) => (
  <Card className="m-3">
    <Card.Body>
      <Card.Title>Modification Profil</Card.Title>
      <Form>
        <Form.Group>
          <Form.Label>Image de profil</Form.Label>
          <div className="mb-3">
            <img src={person.profilPicturePath || 'https://via.placeholder.com/100'} alt="Profile" className="img-thumbnail" />
            <Button variant="secondary" className="ml-3">Uploader une image</Button>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descriptions</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder={person.description || "Placeholder"} />
        </Form.Group>
        <Button variant="primary" type="submit">Modifier</Button>
      </Form>
    </Card.Body>
  </Card>
);

export default UserPagePersonalisation;
