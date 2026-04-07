import React, { useState, useEffect } from 'react';
import './SchemeMatchProfile.css';

const SchemeMatchProfile = () => {
  // State for form data
  const [formData, setFormData] = useState({
    age: '', gender: '', state: '', 
    category: '', occupation: '', income: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isRematching, setIsRematching] = useState(false);
  const [message, setMessage] = useState('');

  // Logic: Fetch the user's existing profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('schemeMatch_token');
        const response = await axios.get('http://localhost:8000/api/user-profiles/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Assuming the user has one profile
        if (response.data.length > 0) {
          setFormData(response.data[0]);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRematching(true);
    setMessage('');
    
    try {
      console.log("Sending updated profile to backend for AI Re-matching:", formData);
      
      const token = localStorage.getItem('schemeMatch_token');
      await axios.put(`http://localhost:8000/api/user-profiles/${formData.id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("AI Re-matching complete.");
      setIsRematching(false);
      setMessage('Profile updated! AI has recalculated your impact scores.');
      
    } catch (err) {
      console.error("Update failed:", err);
      setIsRematching(false);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="sm-profile-container sm-center-all">
        <div className="sm-spinner-large"></div>
      </div>
    );
  }

  return (
    <div className="sm-profile-container">
      <nav className="sm-profile-nav">
        <div className="sm-logo-group">
          <div className="sm-logo-icon">S</div>
          <span className="sm-logo-text">SchemeMatch</span>
        </div>
        <div className="sm-nav-user">
          <button className="sm-btn-text" onClick={() => window.history.back()}>← Dashboard</button>
        </div>
      </nav>

      <main className="sm-profile-main">
        <div className="sm-profile-wrapper">
          
          <div className="sm-profile-header">
            <h1 className="sm-profile-title">Manage Welfare Profile</h1>
            <p className="sm-profile-subtitle">
              Updating these fields will trigger the Gemini AI to recalculate your Personal Impact Scores across all 2,500+ schemes.
            </p>
          </div>

          {message && (
            <div className={`sm-status-message ${message.includes('Failed') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <form className="sm-form" onSubmit={handleSubmit}>
            <div className="sm-input-grid">
              
              <div className="sm-input-group">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" min="18" max="100" required value={formData.age} onChange={handleChange} disabled={isRematching} />
              </div>

              <div className="sm-input-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} disabled={isRematching}>
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm-input-group">
                <label htmlFor="state">State</label>
                <select id="state" name="state" required value={formData.state} onChange={handleChange} disabled={isRematching}>
                  <option value="" disabled>Select State</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div className="sm-input-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" required value={formData.category} onChange={handleChange} disabled={isRematching}>
                  <option value="" disabled>Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div className="sm-input-group">
                <label htmlFor="occupation">Occupation</label>
                <input type="text" id="occupation" name="occupation" required value={formData.occupation} onChange={handleChange} disabled={isRematching} />
              </div>

              <div className="sm-input-group">
                <label htmlFor="income">Annual Income (₹)</label>
                <input type="number" id="income" name="income" required value={formData.income} onChange={handleChange} disabled={isRematching} />
              </div>

            </div>

            <div className="sm-form-actions">
              <button 
                type="submit" 
                className={`sm-btn-submit sm-btn-recalculate ${isRematching ? 'pulse-anim' : ''}`} 
                disabled={isRematching}
              >
                {isRematching ? (
                  <>
                    <div className="sm-spinner-small"></div>
                    AI is Re-matching...
                  </>
                ) : (
                  'Update & Re-calculate Scores'
                )}
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
};

export default SchemeMatchProfile;