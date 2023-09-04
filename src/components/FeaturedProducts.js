import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts'

export default function FeaturedProducts(){

	const [ previews, setPreviews ] = useState([]);
	

	useEffect(()=>{
		fetch(`${process.env.REACT_APP_API_URL}/products/allActive`)
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			const numbers = []
			const featured = []

		const generateRandomNums = () => {
			let randomNum = Math.floor(Math.random()*data.length)

			if(numbers.indexOf(randomNum) === -1){
				numbers.push(randomNum);
			}else{
				generateRandomNums()
			}

		}

		let productLength = 4;
 		if (data.length < 4) { 

			productLength = data.length;   
        } else {
            productLength = 4;
        }

		for(let i=0;i<productLength;i++){
			generateRandomNums()
			featured.push(<PreviewProducts data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} />)
		}

		setPreviews(featured)
		})
	},[])

	return(
		<>
			<h2 className="text-center text-white mt-5">Featured Products</h2>
			<CardGroup className="justify-content-center">
				{previews}
			</CardGroup>
		</>
	)
}