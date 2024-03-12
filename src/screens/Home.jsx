import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="text-center">Diabetes Detection</h1>
      <p className="text-center">
        Check if you might have diabetes using our simple tool.
      </p>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Link to="/upload-analyse">
            <Button variant="secondary" className="mr-2">
              Upload PDF Report
            </Button>
          </Link>
        </Col>
        <Col xs="auto">
          <Link to="/add-analyse">
            <Button variant="secondary">Enter Information Manually</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
