import React, { useState, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import AvatarEditor from 'react-avatar-editor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePerson, uploadProfilePicture } from '../../services/personService';

const UserPagePersonalisation = ({ person, fetchPersonData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageScale, setImageScale] = useState(1.2);
  const editorRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const generateRandomFileName = () => {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };

  const handleSave = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        const fileName = generateRandomFileName() + '.jpg';
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        try {
          const response = await uploadProfilePicture(file);
          const updatePersonDTO = {
            profilPicturePath: response.path // Assuming the API returns the path
          };

          await updatePerson(person.person_Id, updatePersonDTO);
          toast.success('Image de profil modifiée avec succès');
          fetchPersonData();
        } catch (error) {
          toast.error(`Erreur lors de la modification de l'image de profil: ${error.message}`);
        }
      }, 'image/jpeg');
    }
  };

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
