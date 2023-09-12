import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/product/FeaturedProducts';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PlaceholderLoading from 'react-placeholder-loading'

export default function Home() {
	
	const [loading, setLoading] = useState(true);

	useEffect(() => {
	  const t = setTimeout(() => {
		setLoading(false); // Set loading to false after 3000ms
	  }, 500);
  
	  return () => {
		clearTimeout(t); // Cleanup the timeout on unmount
	  };
	}, []);

	
  return (
    <div id="landing">
      <section id="banner">
        <div className="d-flex justify-content-center align-content-center">
	
          <div className="d-flex d-block d-sm-block d-md-none align-items-center">
           <p className="banner textfxa text-center mt-5">
              HOT<Link className="mt-5 textfxb" to="./">/STRINGS</Link>
            </p>
          </div>
          <div className="d-flex d-none d-sm-none d-md-block align-items-center">
            <p className="banner textfxa text-center mt-5">
              HOT<Link className="mt-5 textfxb" to="./">/STRINGS&nbsp;<i className="bowl-rice fa-solid fa-bowl-rice"></i></Link>
            </p>
          </div>
	
        </div>
      </section>

      <h2 className="text-center text-white mt-5">Featured Products</h2>
      <Container>
      <Row id="landing" className="mt-3 mb-3 text-white d-flex justify-content-center">
              <FeaturedProducts />
        </Row>
      </Container>
    </div>
  );
}
