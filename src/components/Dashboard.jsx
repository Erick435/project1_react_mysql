import React from 'react';
import { useUser } from '../UserContext'; // Import the useUser hook

function Dashboard() {
    const { username } = useUser(); // Use the useUser hook

    return (
        <div>
            <h2>Hello {username || 'Guest'}</h2>
            {/* Rest of your Dashboard component */}
        </div>
    );
}

export default Dashboard;
