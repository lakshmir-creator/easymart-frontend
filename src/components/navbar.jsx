import React, { useState, useRef, useEffect } from "react"; // Added hooks
import { Link } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Button, Form, Dropdown } from 'react-bootstrap';
import logo from '../assets/images/logo_easymart.png';
import { isLoggedIn, getUser, logout } from '../utils/auth';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      setUserLoggedIn(isLoggedIn());
      setUser(getUser());
    };
    
    checkLoginStatus();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Focus the input automatically when it opens
  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleLogout = () => {
    logout();
    setUserLoggedIn(false);
    setUser(null);
  };

  return (
    <BSNavbar 
      bg="white" 
      expand="lg" 
      sticky="top"
      style={{ 
        height: '5rem', 
        padding: '0 5%', 
        boxShadow: '0 0.2rem 1.2rem rgba(0,0,0,0.05)',
        zIndex: '1000'
      }}
    >
      {/* LOGO AREA */}
      <BSNavbar.Brand 
        as={Link} 
        to="/" 
        style={{ position: 'relative', width: '12rem', height: '100%', marginRight: '2rem' }}
      >
        <img 
          src={logo} 
          alt="EasyMart" 
          style={{ 
            height: '8.5rem', 
            position: 'absolute', 
            top: '-1.5rem', 
            left: '0',
            filter: 'drop-shadow(0 0.4rem 0.6rem rgba(0,0,0,0.08))',
            zIndex: '1100'
          }} 
        />
      </BSNavbar.Brand>
      
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" style={{ border: 'none' }} />
      
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto gap-lg-5 text-center">
          <Nav.Link as={Link} to="/" className="text-dark fw-bold">Home</Nav.Link>
          <Nav.Link as={Link} to="/catalog" className="text-secondary fw-medium">Catalog</Nav.Link>
          <Nav.Link as={Link} to="/shop" className="text-secondary fw-medium">Shop</Nav.Link>
          <Nav.Link as={Link} to="/contact" className="text-secondary fw-medium">Contact</Nav.Link>
        </Nav>

        {/* RIGHT ACTIONS */}
        <div className="d-flex align-items-center justify-content-center gap-3">
          
          {/* EXPANDABLE SEARCH BAR */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: isSearchOpen ? '#f8f9fa' : 'transparent',
              borderRadius: '2rem',
              padding: isSearchOpen ? '0.2rem 0.5rem' : '0',
              transition: 'all 0.4s ease',
              border: isSearchOpen ? '0.1rem solid #ddd' : '0.1rem solid transparent'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              style={{
                width: isSearchOpen ? '12rem' : '0', // Controls the expansion
                opacity: isSearchOpen ? '1' : '0',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                padding: isSearchOpen ? '0 0.8rem' : '0',
                transition: 'all 0.4s ease',
                fontSize: '0.9rem',
                color: '#333'
              }}
              onBlur={() => setIsSearchOpen(false)} // Collapses when clicking away
            />
            
            <Button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                variant="link" 
                className="p-0 rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                    backgroundColor: '#ff6b35', 
                    width: '2.8rem', 
                    height: '2.8rem',
                    border: 'none',
                    boxShadow: '0 0.2rem 0.5rem rgba(255, 107, 53, 0.3)'
                }}
            >
              <svg style={{ width: '1.3rem', height: '1.3rem' }} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Button>
          </div>

          {/* LOGIN/USER SECTION */}
          {userLoggedIn ? (
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="link" 
                id="dropdown-basic"
                className="d-flex align-items-center"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#1a3c34', 
                  padding: '0',
                  fontSize: '1rem',
                  height: 'auto',
                  textDecoration: 'none',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 500,
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none'
                }}
              >
                Hi {user?.name || 'User'}
                <svg 
                  style={{ 
                    width: '0.8rem', 
                    height: '0.8rem', 
                    marginLeft: '0.5rem',
                    transition: 'transform 0.2s'
                  }} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/orders">
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  My Orders
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/wishlist">
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  Wishlist
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} style={{ color: '#dc3545' }}>
                  <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button 
              as={Link} 
              to="/login" 
              className="border-0 rounded-3"
              style={{ 
                backgroundColor: '#1a3c34', 
                color: 'white', 
                padding: '0 1.8rem',
                fontSize: '1rem',
                height: '2.8rem',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 450
              }}
            >
              Sign Up / Log In
            </Button>
          )}
        </div>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;