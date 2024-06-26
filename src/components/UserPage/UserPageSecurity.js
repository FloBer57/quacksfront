import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useUserSecurity } from "../../hooks/userHooks";

const UserPageSecurity = ({ person, fetchPersonData }) => {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    newPhone,
    setNewPhone,
    handlePasswordChange,
    handlePhoneChange
  } = useUserSecurity(person, fetchPersonData);

  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Sécurité Profil</Card.Title>
        <Form onSubmit={handlePasswordChange}>
          <h5>Modification du mot de passe</h5>
          <Form.Group>
            <Form.Label>Entrez votre mot de passe actuel</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre mot de passe actuel"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Votre nouveau mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmez votre nouveau mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez votre nouveau mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>

        <Form onSubmit={handlePhoneChange} className="mt-4">
          <h5>Modification du téléphone</h5>
          <Form.Group>
            <Form.Label>Numéro de téléphone actuelle</Form.Label>
            <Form.Control
              type="text"
              placeholder="06.06.06.06.06"
              value={person.person_PhoneNumber}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nouveau numéro de téléphone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nouveau numéro de téléphone"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              pattern="\d{10}"
              required
            />
            <Form.Control.Feedback type="invalid">
              Le numéro de téléphone doit comporter exactement 10 chiffres.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserPageSecurity;
