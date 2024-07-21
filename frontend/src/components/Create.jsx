import React, { useState } from "react";
import { motion } from "framer-motion";
import '../components/Create.css';
import {useNavigate} from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState({});
  const navigate=useNavigate('')

 //adding user after clicking the submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const addUser = { name, email, age };
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        'content-type': "application/json"
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }

    if (response.ok) {
      console.log(result);
      navigate('/all')
    }
  };

  return (
    <motion.div
      className="container my-5 p-5 bg-light rounded shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center mb-4">Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <motion.div
          className="mb-3"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <div className="text-danger">{error.name}</div>}
        </motion.div>
        <motion.div
          className="mb-3"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <div className="text-danger">{error.email}</div>}
        </motion.div>
        <motion.div
          className="mb-3"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </motion.div>
        <motion.button
          type="submit"
          className="btn btn-primary w-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Create;
