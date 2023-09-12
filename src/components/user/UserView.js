import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Tabs, Table } from 'react-bootstrap';
import ProductSearch from '../product/ProductSearch';
import SearchByPrice from '../product/SearchByPrice'
import AllProducts from '../product/AllProducts';
import PlaceholderLoading from 'react-placeholder-loading'

export default function UserView({status,endpoint}) {

	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	//   const t = setTimeout(() => {
	// 	setLoading(false); // Set loading to false after 3000ms
	//   }, 30);
  
	//   return () => {
	// 	clearTimeout(t); // Cleanup the timeout on unmount
	//   };
	// }, []);

  return (
    <>
    <div id="userview">
  
        <Container className='' fluid>
        <Row>
          <Col>
            <h2 className="text-center text-white mt-5">{status}</h2>
          </Col>
        </Row>
  
        <Row>
          <Col id="tabs">
            <Tabs
              defaultActiveKey="featured"
              id="fill-tab-example"
              className="mb-5"
              fill
            >
               
              <Tab eventKey="featured" title="All">
           
              <AllProducts endpoint={endpoint} status={status}/>
           
              </Tab>
              <Tab eventKey="name" title="Search By Name">
             
                <ProductSearch />
         
              </Tab>
              <Tab eventKey="price" title="Search By Price">
         
                <SearchByPrice />
             
              </Tab>
              {/* <Tab eventKey="unavailable" title="Out Of Order">
              <AllProducts endpoint={`${endpoint}/inactive`} status={status}/>
              </Tab> */}
            
              
            </Tabs>
          </Col>
        </Row>
      </Container>

  </div>
</>);
}
