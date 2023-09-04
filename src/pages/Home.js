import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts'

// const data = {
//     title: "Zuitt Coding Bootcamp",
//     content: "Opportunities for everyone, everywhere",
//     destination: "/products",
//     label: "Order now!"
// }

export default function Home() {
	return (
		<>

					<section id="landing">
						<div className="d-flex justify-content-center align-content-center mt-5">
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
					{/* <Display /> */}
					<FeaturedProducts/>

		<Footer />
		</>
	)
}
