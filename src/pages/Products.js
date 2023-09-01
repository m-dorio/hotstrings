import productsData from '../data/productsData';
import ProductCard from '../components/ProductCard'
import {Row}  from 'react-bootstrap'

export default function Products() {

	const products = productsData.map(product => {
		return (
                <ProductCard key={product.id} productProp={product} />
		)
	})

	return (
    <div className='text-warning'>
        <Row className='mt-3 mb-3 d-flex justify-content-center'>
            <h1 className="mt-5 text-center text-warning">Products</h1>
            {products}
        </Row>
    </div>
	)
}
