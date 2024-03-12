import React, { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UploadAnalysePage = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const getFullName = (abbreviation) => {
    const mapping = {
      pregs: 'Number of Pregnancies',
      gluc: 'Glucose Level',
      bp: 'Blood Pressure',
      skin: 'Skin Thickness',
      insulin: 'Insulin Level',
      bmi: 'BMI',
      func: 'Diabetes Pedigree Function',
      age: 'Age',
    };

    return mapping[abbreviation] || abbreviation;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!file) return;

  //   const apiUrl = 'http://localhost:5000/upload-pdf';

  //   const formDataObj = new FormData();
  //   formDataObj.append('file', file);

  //   try {
  //     setLoading(true);
  //     // Simulate a delay of 2 seconds before making the actual fetch
  //     setTimeout(async () => {
  //       const response = await fetch(apiUrl, {
  //         method: 'POST',
  //         body: formDataObj,
  //       });

  //       if (response.ok) {
  //         const result = await response.json();
  //         setPrediction(result.prediction);
  //         setFormData(result.input_features);
  //         setError(null);
  //       } else {
  //         console.error('Error:', response.status);
  //         setError('Error fetching API. Please try again.');
  //         setPrediction(null);
  //       }
  //     }, 2000); // Adjust the delay time as needed
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //     setError('Error fetching API. Please try again.');
  //     setPrediction(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) return;

    const apiUrl = 'http://localhost:5000/upload-pdf';

    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      // Start loading
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.prediction);
        // Check if result.input_features is defined before setting the state
        setFormData(result.input_features || null);
        setError(null);
      } else {
        console.error('Error:', response.status);
        setError('Error fetching API. Please try again.');
        setPrediction(null);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error fetching API. Please try again.');
      setPrediction(null);
    } finally {
      // End loading regardless of success or failure
      setLoading(false);
    }
  };

  console.log(loading);

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

      <h2 className="text-center mb-4">Upload Patient Analyse</h2>
      <Card className="w-50 p-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              className="w-50"
              variant="secondary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div>
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    className="mr-1"
                  />
                  Loading...
                </div>
              ) : (
                'Predict'
              )}
            </Button>
          </div>
        </Form>
      </Card>

      {prediction !== null && (
        <Row className="w-75 mt-3">
          {Object.entries(formData).map(([key, value]) => (
            <Col key={key} md={6}>
              <Card className="mt-3 p-3">
                <Form.Group controlId={key}>
                  <Form.Label>{getFullName(key)}</Form.Label>
                  <Form.Control
                    type="text"
                    value={value}
                    placeholder={`Enter ${key}`}
                    disabled
                    className="text-muted"
                  />
                </Form.Group>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Link to="/">
        <Button variant="secondary" className="mt-3">
          Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default UploadAnalysePage;
