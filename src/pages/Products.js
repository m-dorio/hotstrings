import React, { useEffect, useState, useContext} from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    // Retrieve all active products from the API
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
      .then((res) => res.json())
      .then((data) => {
        
        setProducts(data);

    });
  }

	useEffect(() =>{

		fetchData();

	}, []);

  return (
    <>
    {
     
      (user.isAdmin === true) 
        ?
        <>
        <AdminView productsData={products} fetchData={fetchData}/>
        
        </>
        :
        <>
        <UserView productsData={products} />
      
        </>
    }
    </>
)

}
