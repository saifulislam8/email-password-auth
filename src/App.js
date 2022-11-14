import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);
function App() {
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailBlur = event =>{
    setEmail(event.target.value)
  }
  const handlePasswordBlur = event =>{
    setPassword(event.target.value)
  }
  const handleFromSubmit = event =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setValidated(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user;
      console.log(user)
    })
    .catch(error =>{
      console.error(error)
    })
    
     event.preventDefault();
  }
  return (
    <div >
        
        <div  className="registered w-50 mx-auto mt-4">
          <h2 className='text-primary'>Please Regsitered Here!!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFromSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
        <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
      </Form.Group>
      <Button  variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    </div>
  );
}

export default App;
