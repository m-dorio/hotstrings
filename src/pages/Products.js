import React, { useEffect, useState, useContext} from 'react';
import Footer from '../components/Footer'
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    // Retrieve all active products from the API
    fetch(`${process.env.REACT_APP_API_URL}/products/allActive`)
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

    });
  }

	useEffect(() =>{

		fetchData();

	}, []);

//   const data = {
//     btnVariant: "danger",
//     buttonText: "Back home",
//     linkTo: "./"
// }

  return (
    <>
    {
     
      (user.isAdmin === true) 
        ?
        <>
        <AdminView productsData={products} fetchData={fetchData}/>
        <Footer />
        </>
        :
        <>
        <UserView productsData={products} />

        </>
    }
    </>
)

}
