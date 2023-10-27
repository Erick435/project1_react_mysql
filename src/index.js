import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './UserContext'; // Import the UserProvider

ReactDOM.render(
    <UserProvider> {/* Wrap the app with UserProvider */}
        <App />
    </UserProvider>,
    document.getElementById('root')
);