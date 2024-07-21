import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  //getting data in forms to update
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data");
    }
  };
  //click logic for saving the updated data
  const handleEdit = async (e) => {
    e.preventDefault();
    const updateUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:4000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateUser),
        headers: {
          'Content-Type': "application/json"
        },
      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
      } else {
        console.log(result);
        navigate('/all'); 
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <motion.div
      className="container my-5 p-5 bg-light rounded shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center mb-4">Update Data</h2>
      <form>
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
          onClick={handleEdit}
        >
          Update
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Update;
