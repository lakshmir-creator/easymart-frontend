import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import Navbar from '../components/navbar';
import landingBg1 from '../assets/images/landing_bg1.png';

const Landing = () => {
  return (
    <div style={{ background: '#f7f7f7', fontFamily: "'Poppins', sans-serif" }}>
      {/* 1. Added Media Queries for responsive adjustments */}
      <style>
        {`
          @media (max-width: 768px) {
            .hero-title { font-size: 2.2rem !important; }
            .hero-subtitle { font-size: 1.5rem !important; }
            .hero-container { padding: 2rem 1.5rem !important; text-align: center !important; }
            .hero-col { align-items: center !important; text-align: center !important; }
            .category-item { flex: 1 1 40% !important; }
          }
        `}
      </style>

      <Navbar />

      {/* CENTER WRAPPER */}
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1rem' }}>
        
        {/* HERO SECTION */}
        <div
          className="hero-container"
          style={{
            background: '#1a3c34',
            borderRadius: '1.8rem',
            padding: '3rem 4rem',
            marginBottom: '2.5rem',
            color: '#fff',
            overflow: 'hidden'
          }}
        >
          <Row className="align-items-center">
            {/* LEFT CONTENT COLUMN */}
            <Col 
              xs={12} lg={6} // Stacks on mobile, side-by-side on large
              className="hero-col"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                textAlign: 'left',
                marginBottom: '2rem'
              }}
            >
              <p style={{ fontSize: '0.75rem', color: '#8db339', marginBottom: '0.5rem', fontFamily: 'Montserrat, sans-serif' }}>
                Grocery Delivery Service
              </p>

              <h1 className="hero-title" style={{ fontWeight: 700, lineHeight: 1.1, fontSize: '3.5rem' }}>
                <span className="hero-subtitle" style={{ color: '#8db339', fontWeight: 300, fontSize: '2.5rem', display: 'block' }}>Fastest</span>
                <span style={{ color: '#fff' }}>Delivery </span>
                <span style={{ color: '#8db339' }}>&</span>
                <br />
                <span style={{ color: '#fff' }}>Easy </span>
                <span style={{ color: '#8db339' }}>Pickup.</span>
              </h1>

              <Button
                style={{
                  marginTop: '1.5rem',
                  background: '#ff6b35',
                  border: 'none',
                  padding: '0.8rem 2.2rem',
                  borderRadius: '0.6rem',
                  fontWeight: 600,
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                Shop Now
              </Button>

              {/* Users / Review Section */}
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '2.5rem' }}>
                <div style={{ display: 'flex', marginRight: '1rem' }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        background: '#ddd',
                        border: '0.15rem solid #1a3c34',
                        marginLeft: i > 1 ? '-0.8rem' : 0,
                        backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`,
                        backgroundSize: 'cover'
                      }}
                    />
                  ))}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>Our Happy Customer</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    <span style={{ color: '#ffc107' }}>★</span> 4.8 (12.5k Reviews)
                  </div>
                </div>
              </div>
            </Col>

            {/* RIGHT IMAGE COLUMN */}
            <Col xs={12} lg={6} className="text-center">
              <img
                src={landingBg1}
                alt="Basket"
                style={{ width: '100%', maxWidth: '40rem', filter: 'drop-shadow(0 1.25rem 1.875rem rgba(0,0,0,0.3))' }}
              />
            </Col>
          </Row>
        </div>

        {/* SHOP BY CATEGORY */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h5 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif' }}>
            Shop By Category
          </h5>

          <div 
            style={{ 
              display: 'flex', 
              gap: '1.2rem', 
              flexWrap: 'wrap', 
              justifyContent: 'flex-start' 
            }}
          >
              {[
                { name: 'Vegetable', color: '#d7f0d7', img: 'https://cdn-icons-png.flaticon.com/512/2329/2329865.png' },
                { name: 'Sea Fish', color: '#e0dcfa', img: 'https://cdn-icons-png.flaticon.com/512/2970/2970034.png' },
                { name: 'Egg', color: '#ffd6d6', img: 'https://cdn-icons-png.flaticon.com/512/837/837560.png' },
                { name: 'Baking', color: '#d7f0d7', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014535.png' },
                { name: 'Cheese', color: '#fde68a', img: 'https://cdn-icons-png.flaticon.com/512/8065/8065245.png' },
                { name: 'Fresh Fruit', color: '#ffd6d6', img: 'https://cdn-icons-png.flaticon.com/512/3194/3194766.png' },
                { name: 'Beef', color: '#d7f0d7', img: 'https://cdn-icons-png.flaticon.com/512/4843/4843311.png' },
                { name: 'Milk', color: '#e0dcfa', img: 'https://cdn-icons-png.flaticon.com/512/933/933934.png' },
              ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: '0 0 auto'
                }}
              >
                {/* The Colored Card (Measuring 7.5rem x 7.5rem) */}
                <div
                  style={{
                    width: '7.5rem',       
                    height: '7rem',
                    background: item.color,
                    borderRadius: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.8rem',
                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {/* Image fills 70% of the card area */}
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ width: '70%', height: '70%', objectFit: 'contain' }} 
                  />
                </div>

                {/* The Category Name (Below the card) */}
                <div style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    color: '#333',
                    textAlign: 'center' 
                }}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BANNERS SECTION - Stack on mobile using xs={12} */}
        <Row style={{ marginBottom: '2.5rem' }}>
          <Col xs={12} md={6} style={{ marginBottom: '1rem' }}>
            <div style={{ background: '#ffe8d6', padding: '1.5rem', borderRadius: '1rem', height: '100%' }}>
              <h6 style={{ fontWeight: 700 }}>Everyday fresh & clean with our products</h6>
              <Button variant="dark" size="sm" style={{ marginTop: '0.8rem', borderRadius: '0.5rem', fontFamily: 'Montserrat, sans-serif' }}>Shop Now</Button>
            </div>
          </Col>
          <Col xs={12} md={6} style={{ marginBottom: '1rem' }}>
            <div style={{ background: '#d8f3dc', padding: '1.5rem', borderRadius: '1rem', height: '100%' }}>
              <h6 style={{ fontWeight: 700 }}>Make your breakfast healthy and easy</h6>
              <Button variant="dark" size="sm" style={{ marginTop: '0.8rem', borderRadius: '0.5rem', fontFamily: 'Montserrat, sans-serif' }}>Shop Now</Button>
            </div>
          </Col>
        </Row>

        {/* PRODUCTS SECTION */}
        <div>
          <h5 style={{ fontWeight: 700, marginBottom: '1rem' }}>Our All Products</h5>
          <Row>
            {[1,2,3,4].map(i => (
              <Col xs={6} md={3} key={i} style={{ marginBottom: '1rem' }}>
                <Card style={{ borderRadius: '1rem', border: 'none', boxShadow: '0 0.25rem 0.625rem rgba(0,0,0,0.05)' }}>
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/015/100/015/non_2x/red-bell-pepper-isolated-on-transparent-background-free-png.png"
                      style={{ height: '5rem', maxWidth: '100%', objectFit: 'contain' }}
                      alt=""
                    />
                  </div>
                  <Card.Body style={{ padding: '0.8rem' }}>
                    <div style={{ fontSize: '0.65rem', color: '#8db339', fontWeight: 700 }}>Vegetable</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Fresh Red Pepper</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <span style={{ fontWeight: 700 }}>$2.50</span>
                      <Button size="sm" style={{ background: '#1a3c34', border: 'none', borderRadius: '0.4rem' }}>+</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

      </div>
    </div>
  );
};

export default Landing;