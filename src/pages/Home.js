import Banner from '../components/Banner'
import Display from '../components/Display'

export default function Home() {
	return (
		<>
			<Banner 
				title="HOT/STRINGS"
                subtitle="Noodle Store App"
                btnVariant="primary"
                buttonText="Buy Now!"
				linkTo="/"
				/>
			<Display />
		</>
		
	)
}
