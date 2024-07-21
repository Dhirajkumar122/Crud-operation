import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //getting data from the server
  async function getData() {
    try {
      const response = await fetch("http://localhost:4000"); 
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Error fetching data");
    }
  }

  //adding logic after clicking on delete button
  const handleClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/${id}`,{
        method:"DELETE"
      }); 
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("Data Deleted Successfully");
        setTimeout(() => {
          setError("");
          getData();
        }, 1000);
      }
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Error fetching data");
    }
  };

  const handleUpadte=(id)=>{
    navigate(`/${id}`)

  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      <style>
        {`
          .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
          }
          .card {
            width: 100%;
            max-width: 300px; /* Adjust the max-width as needed */
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            margin: 1rem 0; /* Vertical margin to add space between rows */
          }
          .card:hover {
            transform: translateY(-5px);
          }
          .card-body {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .card-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          .card-text {
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }
          .btn {
            width: 100%;
            margin-top: 0.5rem;
          }
        `}
      </style>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">All Data</h2>
      <div className="card-container">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="card m-2" key={index}>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Email: {item.email}</p>
                <p>Age: {item.age}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleClick(item._id)}
                >
                  Delete
                </button>
                <button className="btn btn-primary" onClick={()=>handleUpadte(item._id)}>Update</button>
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default Read;
