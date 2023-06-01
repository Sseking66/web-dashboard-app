import React, { useState } from 'react';

const Login = () => {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here based on selected user type
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Type:
          <select value={userType} onChange={handleUserTypeChange}>
            <option value="">Select User Type</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="transporter">Transporter</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Entering;