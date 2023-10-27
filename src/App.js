import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import Dashboard from './components/Dashboard';
function App() {

  const [user, setUser] = useState(null); //manage user state;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/" element={<Dashboard user={user}/>} />
          {/* You can add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
