import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewDietPlans() {
    const [dietPlans, setDietPlans] = useState([]);
    const [error, setError] = useState("");

    // Fetch all diet plans from the backend
    const fetchDietPlans = async () => {
        try {
            // Ensure the backend URL is correct and accessible
            const response = await axios.get("http://localhost:2025/diet-plans/view");  
            if (response.status === 200) {
                setDietPlans(response.data);  // Assuming diet plans come as an array in the response
            } else {
                setError("Failed to fetch diet plans. Please try again.");
            }
        } catch (error) {
            setError("Error fetching diet plans. Please try again.");
            console.error("Error fetching diet plans:", error.message);
        }
    };

    useEffect(() => {
        fetchDietPlans();  // Fetch diet plans on component mount
    }, []);

    return (
        <div>
            <h3>View All Diet Plans</h3>
            
            {/* Show error message if there's an issue */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Diet Plan Table */}
            <table border="2" style={{ width: "100%", padding: "10px", textAlign: "center", color: "black" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Calories</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Show a message if no diet plans are available */}
                    {dietPlans.length === 0 ? (
                        <tr>
                            <td colSpan="5">No diet plans available.</td>
                        </tr>
                    ) : (
                        // Map through the fetched diet plans and display them
                        dietPlans.map((dietPlan) => (
                            <tr key={dietPlan.id}>
                                <td>{dietPlan.id}</td>
                                <td>{dietPlan.name}</td>
                                <td>{dietPlan.description}</td>
                                <td>{dietPlan.calories}</td>
                                {/* Ensure items is an array before joining */}
                                <td>{Array.isArray(dietPlan.items) ? dietPlan.items.join(", ") : dietPlan.items}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
