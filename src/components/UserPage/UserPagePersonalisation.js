import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import AvatarEditor from 'react-avatar-editor';
import { useUserPersonalisation } from '../../hooks/userHooks';

const UserPagePersonalisation = ({ person, fetchPersonData }) => {
  const {
    selectedImage,
    imageScale,
    setImageScale,
    editorRef,
    handleImageChange,
    handleSave
  } = useUserPersonalisation(person, fetchPersonData);

  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Modification Profil</Card.Title>
        <Form>
          <Form.Group>
            <Form.Label>Image de profil</Form.Label>
            {selectedImage ? (
              <div className="avatar-preview">
                <AvatarEditor
                  ref={editorRef}
                  image={selectedImage}
                  width={250}
                  height={250}
                  border={50}
                  borderRadius={125}
                  scale={imageScale}
                  rotate={0}
                />
              </div>
            ) : (
              <div style={{ width: '100px', height: '100px', border: '1px solid #ddd' }} />
            )}
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            {selectedImage && (
              <div>
                <Form.Label>Zoom</Form.Label>
                <Form.Control
                  type="range"
                  value={imageScale}
                  min="1"
                  max="2"
                  step="0.01"
                  onChange={(e) => setImageScale(parseFloat(e.target.value))}
                />
              </div>
            )}
          </Form.Group>
          <Button onClick={handleSave}>Uploader une image</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserPagePersonalisation;
