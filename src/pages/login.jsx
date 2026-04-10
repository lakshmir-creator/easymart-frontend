import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../assets/images/login_img.png';
import logo from '../assets/images/logo_easymart.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ApiService from '../api/api';

// VALIDATION HELPERS
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateMobile = (mobile) => {
  // Remove any spaces, dashes, or other characters and check if it's exactly 10 digits
  const cleanMobile = mobile.replace(/\D/g, ''); // Remove all non-digits
  return cleanMobile.length === 10;
};

// FormInput with real-time validation feedback
const FormInput = ({ label, type, placeholder, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const isPassword = type === 'password';
  const isEmail = type === 'email';
  const isMobile = type === 'tel';

  // Real-time validation
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    
    // For mobile/tel inputs, restrict to 10 digits only
    if (isMobile) {
      // Remove all non-digits
      inputValue = inputValue.replace(/\D/g, '');
      // Limit to 10 digits
      if (inputValue.length > 10) {
        inputValue = inputValue.slice(0, 10);
      }
      // Update the event target value
      e.target.value = inputValue;
    }
    
    onChange(e);

    // Clear validation message when user starts typing
    if (validationMessage) {
      setValidationMessage('');
    }
  };

  const handleBlur = () => {
    if (value) {
      if (isEmail && !validateEmail(value)) {
        setValidationMessage('Please enter a valid email address');
      } else if (isMobile && !validateMobile(value)) {
        setValidationMessage('Please enter a valid 10-digit mobile number');
      } else if (name === 'identifier') {
        // For login identifier field
        if (!validateEmail(value) && !validateMobile(value)) {
          setValidationMessage('Please enter a valid email or 10-digit mobile number');
        }
      }
    }
  };

  const isValid = !validationMessage && value;
  const isInvalid = validationMessage && value;

  return (
    <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
      <label style={{ 
        display: 'block', 
        fontSize: '0.85rem', 
        fontWeight: 600, 
        color: '#1a3c34', 
        marginBottom: '0.4rem' 
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          name={name}
          maxLength={isMobile ? 10 : undefined}
          pattern={isMobile ? "[0-9]{10}" : undefined}
          inputMode={isMobile ? "numeric" : undefined}
          style={{
            width: '100%',
            padding: isPassword ? '0.85rem 2.8rem 0.85rem 1.2rem' : '0.85rem 1.2rem',
            borderRadius: '0.8rem',
            border: `0.12rem solid ${isInvalid ? '#ef4444' : isValid ? '#10b981' : '#e2e8f0'}`,
            backgroundColor: '#f8fafc',
            outline: 'none',
            fontSize: '0.9rem',
            color: '#1a3c34',
            caretColor: '#1a3c34',
            transition: 'border-color 0.2s'
          }}
        />
        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#94a3b8'
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
        {/* Validation icon */}
        {!isPassword && value && (
          <span style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.9rem'
          }}>
            {isValid ? '✓' : isInvalid ? '✗' : ''}
          </span>
        )}
      </div>
      {/* Validation message */}
      {validationMessage && (
        <div style={{
          fontSize: '0.75rem',
          color: '#ef4444',
          marginTop: '0.25rem',
          marginLeft: '0.5rem'
        }}>
          {validationMessage}
        </div>
      )}
    </div>
  );
};

const Login = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', mobile: '', password: '' });

  // Handle Login with Validation
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    // Client-side validation
    const { identifier } = loginForm;
    if (!validateEmail(identifier) && !validateMobile(identifier)) {
      setMessage('Please enter a valid email or 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const result = await ApiService.login(loginForm);
      if (result.success) {
        setMessage('Login successful! Redirecting...');
        localStorage.setItem('user', JSON.stringify(result.data));
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(result.data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup with Validation
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    // Client-side validation
    if (!validateEmail(signupForm.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    if (!validateMobile(signupForm.mobile)) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const result = await ApiService.signup(signupForm);
      if (result.success) {
        setMessage('Account created successfully! Please login.');
        setSignupForm({ name: '', email: '', mobile: '', password: '' });
        setTimeout(() => {
          setIsFlipped(false);
          setMessage('');
        }, 2000);
      } else {
        const data = result.data;
        setMessage(data.name?.[0] || data.email?.[0] || data.mobile?.[0] || data.password?.[0] || 'Registration failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', width: '100%', display: 'flex', 
      fontFamily: "'Poppins', sans-serif", overflowX: 'hidden',
      backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center',
      position: 'relative'
    }}>
      <style>
        {`
          input::placeholder { color: #cbd5e1 !important; opacity: 1; }
          input::-webkit-input-placeholder { color: #cbd5e1 !important; }
          input:-webkit-autofill {
            -webkit-text-fill-color: #1a3c34 !important;
            transition: background-color 9999s ease-in-out 0s;
          }
        `}
      </style>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(26,60,52,0.95) 0%, rgba(26,60,52,0.5) 100%)', zIndex: 1 }}></div>

      <div style={{ 
        position: 'relative', zIndex: 10, width: '100%', display: 'flex', 
        padding: '6rem 5% 2rem', alignItems: 'flex-start', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' 
      }}>
        
        {/* LEFT SIDE CONTENT */}
        <div style={{ flex: '0 1 35rem', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }} className="d-none d-lg-flex">
          <img src={logo} alt="Logo" style={{ height: '14rem', marginBottom: '0', marginTop: '-3rem', marginLeft: '-2.5rem' }} />
          <h1 style={{ fontSize: '4.2rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.15rem', marginTop: '-1.5rem' }}>
            Pure. Organic. <br /> <span style={{ color: '#8db339' }}>Right to You.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', opacity: 0.85, maxWidth: '30rem', fontWeight: 300, lineHeight: 1.6 }}>
            Experience the easiest way to shop for farm-fresh groceries. Your health is our priority, delivered fresh daily.
          </p>
        </div>

        {/* RIGHT SIDE CARD */}
        <div style={{ flex: '0 1 30rem', perspective: '150rem' }}>
          <div style={{ 
            position: 'relative', width: '100%', minHeight: '38rem',
            transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
            transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}>
            
            {/* FRONT SIDE (LOGIN) */}
            <div style={{ 
              position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', 
              backgroundColor: 'white', borderRadius: '2.5rem', padding: '3rem 2.5rem', 
              boxShadow: '0 3rem 6rem rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' 
            }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1a3c34', marginBottom: '0.8rem' }}>Welcome Back</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>Sign in to continue your journey</p>

              {message && (
                <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da', color: message.includes('successful') ? '#155724' : '#721c24', fontSize: '0.875rem' }}>
                  {message}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <FormInput 
                  label="Email or Mobile" 
                  type="text" 
                  placeholder="mail@easymart.com or 1234567890" 
                  value={loginForm.identifier} 
                  onChange={(e) => setLoginForm({...loginForm, identifier: e.target.value})} 
                  name="identifier"
                />
                <FormInput 
                  label="Password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={loginForm.password} 
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                  name="password"
                />
                <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: loading ? '#94a3b8' : '#1a3c34', color: 'white', padding: '1.1rem', borderRadius: '1.2rem', border: 'none', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <p style={{ marginTop: '2.5rem', fontSize: '0.95rem', color: '#64748b' }}>
                New member? <span onClick={() => {setIsFlipped(true); setMessage('');}} style={{ color: '#ff6b35', fontWeight: 800, marginLeft: '0.6rem', cursor: 'pointer' }}>Create Account</span>
              </p>
            </div>

            {/* BACK SIDE (SIGN UP) */}
            <div style={{ 
              position: 'absolute', width: '100%', height: '110%', backfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)', backgroundColor: 'white', borderRadius: '2.5rem', 
              padding: '3rem 2.5rem', boxShadow: '0 3rem 6rem rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' 
            }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1a3c34', marginBottom: '0.5rem' }}>Get Started</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Fill in your details below</p>

              {message && (
                <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem', backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da', color: message.includes('successful') ? '#155724' : '#721c24', fontSize: '0.875rem' }}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSignup}>
                <FormInput 
                  label="Full Name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={signupForm.name} 
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})} 
                  name="name"
                />
                <FormInput 
                  label="Email Address" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={signupForm.email} 
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})} 
                  name="email"
                />
                <FormInput 
                  label="Phone Number" 
                  type="tel" 
                  placeholder="1234567890" 
                  value={signupForm.mobile} 
                  onChange={(e) => setSignupForm({...signupForm, mobile: e.target.value})} 
                  name="mobile"
                />
                <FormInput 
                  label="Password" 
                  type="password" 
                  placeholder="Create a password" 
                  value={signupForm.password} 
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})} 
                  name="password"
                />
                <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: loading ? '#94a3b8' : '#ff6b35', color: 'white', padding: '1.1rem', borderRadius: '1.2rem', border: 'none', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', marginTop: '1rem' }}>
                  {loading ? 'Creating Account...' : 'Join Now'}
                </button>
              </form>
              <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#64748b' }}>
                Already have an account? <span onClick={() => {setIsFlipped(false); setMessage('');}} style={{ color: '#1a3c34', fontWeight: 800, marginLeft: '0.6rem', cursor: 'pointer' }}>Login Here</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;