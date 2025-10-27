import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  Form, 
  Button, 
  ProgressBar, 
  Row, 
  Col 
} from 'react-bootstrap';
import './App.css'; // We will create this file next

function App() {
  // State to manage which step we are on
  const [step, setStep] = useState(1);

  // State to store all the form data
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    // Step 2: Work Experience
    jobTitle: '',
    company: '',
    jobDetails: '',
    // Step 3: Education
    degree: '',
    school: '',
    // Step 4: Skills & Job Description
    skills: '',
    jobDescription: '',
  });

  // Function to go to the next step
  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  // Function to go to the previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Function to handle changes in any form field
  const handleChange = (e) => {
    const { name, value } = e.target;
    // We update the 'formData' state with the new value
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle the final submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we will just log the data to the console
    console.log('Final Form Data:');
    console.log(formData);
    alert('Resume generation started! (Check the console for data)');
    // In a future step, we will send this to our backend.
  };

  // This function renders the correct form step
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1PersonalDetails 
            formData={formData} 
            handleChange={handleChange} 
          />
        );
      case 2:
        return (
          <Step2Experience 
            formData={formData} 
            handleChange={handleChange} 
          />
        );
      case 3:
        return (
          <Step3Education 
            formData={formData} 
            handleChange={handleChange} 
          />
        );
      case 4:
        return (
          <Step4SkillsAndJob 
            formData={formData} 
            handleChange={handleChange} 
          />
        );
      default:
        return <div>Error: Unknown step</div>;
    }
  };

  return (
    <div className="app-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="form-card shadow-sm">
              <Card.Body>
                
                <h2 className="text-center mb-4">Create Your Resume</h2>
                
                {/* Progress Bar */}
                <ProgressBar 
                  now={(step / 4) * 100} 
                  label={`Step ${step} of 4`} 
                  className="mb-4" 
                />

                {/* Form fields rendered based on step */}
                <Form onSubmit={handleSubmit}>
                  {renderFormStep()}
                  
                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-between mt-4">
                    {step > 1 && (
                      <Button variant="secondary" onClick={prevStep}>
                        Back
                      </Button>
                    )}
                    
                    {step < 4 && (
                      <Button variant="primary" onClick={nextStep} className="ms-auto">
                        Next
                      </Button>
                    )}

                    {step === 4 && (
                      <Button variant="success" type="submit" className="ms-auto">
                        Generate Resume
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// --- Sub-Components for Each Step ---
// These are just functions that return JSX, keeping our main App component clean.

const Step1PersonalDetails = ({ formData, handleChange }) => (
  <>
    <h4>Personal Details</h4>
    <Form.Group className="mb-3">
      <Form.Label>Full Name</Form.Label>
      <Form.Control
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="e.g., Kasun Perera"
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email Address</Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="e.g., kasun@gmail.com"
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="e.g., 077 123 4567"
        required
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>LinkedIn Profile (Optional)</Form.Label>
      <Form.Control
        type="text"
        name="linkedin"
        value={formData.linkedin}
        onChange={handleChange}
        placeholder="e.g., https://linkedin.com/in/kasunperera"
      />
    </Form.Group>
  </>
);

const Step2Experience = ({ formData, handleChange }) => (
  <>
    <h4>Work Experience (Your Last Job)</h4>
    <p className="text-muted small">
      Just add your most recent or relevant job. The AI will make it sound professional.
    </p>
    <Form.Group className="mb-3">
      <Form.Label>Job Title</Form.Label>
      <Form.Control
        type="text"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        placeholder="e.g., Sales Assistant"
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Company</Form.Label>
      <Form.Control
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="e.g., Cargills Food City"
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>What you did (Simple sentences are fine)</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="jobDetails"
        value={formData.jobDetails}
        onChange={handleChange}
        placeholder="e.g., Helped customers. Handled cash register. Stocked shelves."
      />
    </Form.Group>
  </>
);

const Step3Education = ({ formData, handleChange }) => (
  <>
    <h4>Education</h4>
    <Form.Group className="mb-3">
      <Form.Label>Degree or Certificate</Form.Label>
      <Form.Control
        type="text"
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        placeholder="e.g., G.C.E. A/L (Advanced Level) or B.Sc. in Business"
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>School or University</Form.Label>
      <Form.Control
        type="text"
        name="school"
        value={formData.school}
        onChange={handleChange}
        placeholder="e.g., Royal College, Colombo or University of Moratuwa"
      />
    </Form.Group>
  </>
);

const Step4SkillsAndJob = ({ formData, handleChange }) => (
  <>
    <h4>Skills</h4>
    <Form.Group className="mb-3">
      <Form.Label>List your skills (comma separated)</Form.Label>
      <Form.Control
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="e.g., Good communication, MS Office, Teamwork"
      />
    </Form.Group>
    
    <hr className="my-4" />

    <h4>The "Magic" Step</h4>
    <Form.Group className="mb-3">
      <Form.Label>Paste the Job Description or Job Ad</Form.Label>
      <p className="text-muted small">
        This is the most important part! The AI will use this to match your CV to the job.
      </p>
      <Form.Control
        as="textarea"
        rows={6}
        name="jobDescription"
        value={formData.jobDescription}
        onChange={handleChange}
        placeholder="Paste the job ad you found on a website here."
        required
      />
    </Form.Group>
  </>
);

export default App;