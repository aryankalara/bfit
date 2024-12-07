import React, { useState } from "react";
import axios from "axios";

const AddDietPlan = () => {
  const [dietPlan, setDietPlan] = useState({
    name: "",
    description: "",
    calories: "",
    items: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setDietPlan({ ...dietPlan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDietPlan = {
      ...dietPlan,
      calories: Number(dietPlan.calories),  // Ensure calories is a number
      items: dietPlan.items.split(",").map(item => item.trim()), // Convert comma-separated string into an array
    };

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:2025/diet-plans/add", formattedDietPlan);
      
      if (response.status === 201) {
        setMessage("Diet plan added successfully!");
        setDietPlan({ name: "", description: "", calories: "", items: "" }); // Reset form
      } else {
        setMessage(`Failed to add diet plan. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error occurred while adding diet plan:", error);
      setMessage(`Error occurred while adding diet plan: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-diet-plan-container">
      <h3 className="text-2xl font-bold text-center mb-6">Add New Diet Plan</h3>

      {/* Display message */}
      {message && <p className={`text-center mb-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="diet-form space-y-6">
        {/* Diet Plan Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold">Diet Plan Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={dietPlan.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Diet Plan Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold">Description *</label>
          <textarea
            id="description"
            name="description"
            value={dietPlan.description}
            onChange={handleChange}
            required
            rows="4"
            className="input-field"
          />
        </div>

        {/* Calories */}
        <div>
          <label htmlFor="calories" className="block text-gray-700 font-semibold">Calories *</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={dietPlan.calories}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Items (comma-separated) */}
        <div>
          <label htmlFor="items" className="block text-gray-700 font-semibold">Items (comma-separated) *</label>
          <input
            type="text"
            id="items"
            name="items"
            value={dietPlan.items}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`submit-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Adding...' : 'Add Diet Plan'}
          </button>
        </div>
      </form>

      {/* Internal CSS */}
      <style jsx>{`
        .add-diet-plan-container {
          background-color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 2rem;
          max-width: 600px;
          margin: 2rem auto;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          margin-top: 0.5rem;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s ease-in-out;
        }

        .input-field:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 5px rgba(79, 70, 229, 0.5);
        }

        .submit-button {
          width: 100%;
          padding: 0.75rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out;
        }

        .submit-button:hover {
          background-color: #4338ca;
        }

        .submit-button:disabled {
          background-color: #9ca3af;
        }

        .diet-form label {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: #4a5568;
        }

        .diet-form p {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default AddDietPlan;
