import { useState, useEffect } from 'react';

const CounselingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    class10: '',
    class12: '',
    currentClass: '',
    board: '',
    location: '',
    budget: '',
    entranceExam: '',
    stream: '',
    counselingPreference: '',
    parentName: '',
    parentPhone: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Counseling - CareerGuide';
    
    const savedSubmissions = localStorage.getItem('counselingSubmissions');
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.currentClass) newErrors.currentClass = 'Current class is required';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const submission = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() };
    const newSubmissions = [submission, ...submissions];
    
    localStorage.setItem('counselingSubmissions', JSON.stringify(newSubmissions));
    setSubmissions(newSubmissions);
    
    setSuccess(true);
    setFormData({
      name: '', email: '', phone: '', course: '', message: '', class10: '', class12: '',
      currentClass: '', board: '', location: '', budget: '', entranceExam: '',
      stream: '', counselingPreference: '', parentName: '', parentPhone: ''
    });
    setLoading(false);
    
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Counseling Request Form</h1>
        
        {success && (
          <div style={{
            background: '#10b981',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            ✅ Counseling request submitted successfully! We'll contact you within 24 hours.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{borderColor: errors.name ? '#ef4444' : ''}}
            />
            {errors.name && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{borderColor: errors.email ? '#ef4444' : ''}}
            />
            {errors.email && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{borderColor: errors.phone ? '#ef4444' : ''}}
            />
            {errors.phone && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.phone}</span>}
          </div>

          {/* Academic Details */}
          <div className="form-group">
            <label>Current Class/Grade *</label>
            <select name="currentClass" value={formData.currentClass} onChange={handleChange} style={{borderColor: errors.currentClass ? '#ef4444' : ''}}>
              <option value="">Select Class</option>
              <option value="10th">Class 10th</option>
              <option value="11th">Class 11th</option>
              <option value="12th">Class 12th</option>
              <option value="Graduation">Graduation 1st Year</option>
              <option value="Post-Graduation">Post-Graduation</option>
            </select>
            {errors.currentClass && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.currentClass}</span>}
          </div>

          <div className="form-group">
            <label>Board/University</label>
            <select name="board" value={formData.board} onChange={handleChange}>
              <option value="">Select Board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="IB">IB</option>
              <option value="Other">Other University</option>
            </select>
          </div>

          <div className="form-group">
            <label>Class 10th %</label>
            <input type="number" name="class10" value={formData.class10} onChange={handleChange} min="0" max="100" />
          </div>

          <div className="form-group">
            <label>Class 12th % (if applicable)</label>
            <input type="number" name="class12" value={formData.class12} onChange={handleChange} min="0" max="100" />
          </div>

          <div className="form-group">
            <label>Stream (Science/Commerce/Arts)</label>
            <select name="stream" value={formData.stream} onChange={handleChange}>
              <option value="">Select Stream</option>
              <option value="Science">Science (PCM/PCB)</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts/Humanities</option>
            </select>
          </div>

          {/* Course & Career Details */}
          <div className="form-group">
            <label>Preferred Course *</label>
            <select name="course" value={formData.course} onChange={handleChange} style={{borderColor: errors.course ? '#ef4444' : ''}}>
              <option value="">Select Course</option>
              <option value="B.Tech CS">B.Tech Computer Science</option>
              <option value="B.Tech ECE">B.Tech Electronics</option>
              <option value="MBA Marketing">MBA Marketing</option>
              <option value="MBA Finance">MBA Finance</option>
              <option value="Data Science">B.Sc Data Science</option>
              <option value="Psychology">BA Psychology</option>
              <option value="Medicine">MBBS/BDS</option>
              <option value="Law">LLB</option>
            </select>
            {errors.course && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.course}</span>}
          </div>

          <div className="form-group">
            <label>Location Preference</label>
            <select name="location" value={formData.location} onChange={handleChange}>
              <option value="">Select Preference</option>
              <option value="Local">Local (Shivamogga)</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Other States">Other States</option>
              <option value="Abroad">Abroad</option>
            </select>
          </div>

          <div className="form-group">
            <label>Budget Range (Total Course Fee)</label>
            <select name="budget" value={formData.budget} onChange={handleChange}>
              <option value="">Select Budget</option>
              <option value="Under 5L">Under ₹5 Lakhs</option>
              <option value="5-10L">₹5-10 Lakhs</option>
              <option value="10-20L">₹10-20 Lakhs</option>
              <option value="20L+">₹20 Lakhs +</option>
            </select>
          </div>

          <div className="form-group">
            <label>Entrance Exams Planned</label>
            <input type="text" name="entranceExam" value={formData.entranceExam} onChange={handleChange} placeholder="JEE, NEET, CAT, etc." />
          </div>

          <div className="form-group">
            <label>Counseling Preference</label>
            <select name="counselingPreference" value={formData.counselingPreference} onChange={handleChange}>
              <option value="">Select Preference</option>
              <option value="Online">Online (Video Call)</option>
              <option value="Offline">Offline (In-person)</option>
              <option value="Phone">Phone Call</option>
            </select>
          </div>

          {/* Parent Details */}
          <div className="form-group">
            <label>Parent/Guardian Name</label>
            <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Parent/Guardian Phone *</label>
            <input
              type="tel"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              style={{borderColor: errors.parentPhone ? '#ef4444' : ''}}
            />
            {errors.parentPhone && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.parentPhone}</span>}
          </div>

          {/* Message */}
          <div className="form-group">
            <label>Additional Message (Optional)</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your career goals, concerns, or specific questions..."
            />
          </div>

          <button type="submit" className="btn" disabled={loading} style={{width: '100%', padding: '16px'}}>
            {loading ? 'Submitting...' : 'Submit Counseling Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CounselingForm;
