import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewUsers() {
    const [users, setUsers] = useState([]);

    // Fetch all users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:2025/users/view"); // Update with the correct backend URL
            setUsers(response.data);
        } catch (error) {
            console.log(error.message); // Log error for debugging
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    return (
        <div>
            <h3>View All Users</h3>
            <table 
                border="2" 
                style={{ 
                    width: "100%", 
                    padding: "10px", 
                    textAlign: "center", 
                    color: "black" // Ensure the text is black
                }}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Activity Level</th>
                        <th>Goals</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="7">No users available.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.activity_level}</td>
                                <td>{user.goals.join(", ")}</td>
                                <td>{user.location}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
