import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const UserPageInfo = ({ person }) => {
  return (
    <Container className="mt-3">
      <Card>
        <Card.Body>
          <Card.Title>Mentions légales</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut leo erat. Proin imperdiet enim id diam lobortis imperdiet. Cras ut dui dui. Integer vel erat ornare, tincidunt justo eget, finibus metus. Praesent cursus, lorem eu sagittis ultricies, ligula orci dapibus turpis, quis auctor lacus nibh nec risus. Nullam vitae cursus est. Vestibulum rhoncus sagittis sapien, et semper tellus sodales vel. Vestibulum ligula lacus, dignissim eu purus quis, pellentesque tempus tellus. Fusce quis ultrices arcu. Nunc at eros vel lorem egestas venenatis. Duis nulla erat, tincidunt sit amet mattis eu, dictum ac leo. Nulla et consequat arcu, eu placerat ipsum. Aliquam tellus metus, iaculis nec mauris eget, fringilla convallis urna. Aliquam sit amet tincidunt est. Vivamus sit amet lorem urna. Curabitur rhoncus mattis eros nec consequat. Duis arcu magna, dignissim nec consectetur quis, varius at lorem. Donec commodo, odio nec sollicitudin elementum, velit metus lobortis lectus, id laoreet leo mauris feugiat est. Maecenas vel lorem semper, pretium lorem convallis, fermentum metus. Nulla interdum metus vitae mi elementum, lacinia fermentum nisl aliquam. Nulla nec sem et orci ullamcorper consectetur.
            <br /><br />
            Nulla aliquet a ante vel hendrerit. Duis turpis ante, ornare ac finibus ut, aliquam vel risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam vitae dui tellus. Proin tincidunt commodo ullamcorper. Nam aliquet purus vel libero rutrum venenatis. Donec varius lacus ut sem fermentum, non aliquam mi fermentum. Curabitur consequat, odio sit amet lacinia scelerisque, felis turpis varius lacus, ut feugiat eros ligula a ante. Quisque efficitur magna vel nisi malesuada, ut eleifend nisi tincidunt. Nulla facilisi. Suspendisse potenti. Praesent auctor eros quis odio posuere, non sodales orci sollicitudin. Nam eget quam ut risus tincidunt scelerisque vel a felis. Nullam tincidunt turpis at mi dictum, nec lacinia justo tempus. Proin id nulla orci. Fusce ultricies justo sit amet libero efficitur, id lobortis ex ullamcorper. Nulla facilisi.
          </Card.Text>
          <Button variant="primary">Télécharger ses données</Button>
          <Card.Text className="mt-3">
            Conformément au RGPD, vous pouvez télécharger toutes les données vous concernant.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserPageInfo;
