import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container } from '@mui/material';
import BiodataForm from './BiodataForm';
import SkillsForm from './SkillsForm';
import ProjectForm from './ProjectForm';

const steps = ['Biodata', 'Skills', 'Project'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BiodataForm />;
      case 1:
        return <SkillsForm />;
      case 2:
        return <ProjectForm />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5">Registration Complete</Typography>
            <Button onClick={() => setActiveStep(0)}>Restart</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Register;
