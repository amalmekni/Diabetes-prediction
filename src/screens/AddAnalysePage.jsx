import React, { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Col,
  Row,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddAnalysePage = ({ setInputData }) => {
  const [formData, setFormData] = useState({
    pregs: '',
    gluc: '',
    bp: '',
    skin: '',
    insulin: '',
    bmi: '',
    func: '',
    age: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) || 0 });
  };

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching API:', error);
        setError('Error fetching API. Please try again.');
        setPrediction(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      {loading && (
        <Alert variant="info" className="mt-3 w-50">
          Loading...
        </Alert>
      )}

      {prediction !== null && !loading && (
        <Alert
          variant={prediction === 1 ? 'danger' : 'success'}
          className="mt-3 w-50"
        >
          {prediction === 1
            ? 'Patient is likely to have diabetes.'
            : 'Patient is likely not to have diabetes.'}
        </Alert>
      )}

      {error && !loading && (
        <Alert variant="danger" className="mt-3 w-50">
          {error}
        </Alert>
      )}
      <h2 className="text-center mb-4 ">Provide Patient Details</h2>
      <Card className=" w-50 p-5">
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group controlId="gluc" className="mb-3">
                  <Form.Label className="text-secondary h3">
                    Glucose Level
                  </Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Glucose (mg/dL)"
                    name="gluc"
                    value={formData.gluc}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="bp" className="mb-3">
                  <Form.Label className="text-secondary h3">
                    Blood Pressure
                  </Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Blood Pressure (mmHg)"
                    name="bp"
                    value={formData.bp}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="insulin" className="mb-3">
                  <Form.Label className="text-secondary h3">
                    Insulin Level
                  </Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Insulin Level (IU/mL)"
                    name="insulin"
                    value={formData.insulin}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="bmi" className="mb-3">
                  <Form.Label className="text-secondary h3">BMI</Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Body Mass Index (kg/m²)"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="age" className="mb-3">
                  <Form.Label className="text-secondary h3">Age</Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Age (years)"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="pregs" className="mb-3">
                  <Form.Label className="text-secondary h3">
                    Pregnancies
                  </Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Number of Pregnancies"
                    name="pregs"
                    value={formData.pregs}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="skin" className="mb-3">
                  <Form.Label className="text-secondary h3">
                    Skin Thickness
                  </Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Skin Thickness (mm)"
                    name="skin"
                    value={formData.skin}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="func" className="mb-3">
                  <Form.Label className="text-secondary h3">DPF</Form.Label>
                  <Form.Control
                    className="text-center"
                    type="number"
                    required
                    placeholder="Diabetes Pedigree Function"
                    name="func"
                    value={formData.func}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Button
            variant="secondary"
            type="submit"
            className="mt-3 mx-auto d-block w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className="mr-1"
                ></Spinner>
                Loading...
              </>
            ) : (
              'Predict'
            )}
          </Button>
        </Form>
      </Card>

      <Link to="/">
        <Button variant="secondary" className="mt-3 ">
          Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default AddAnalysePage;
