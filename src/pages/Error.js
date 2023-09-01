import Banner from '../components/Banner'

export default function Error() {
    return (
        
        <div className='d-flex justify-content-around align-items-center text-center text-warning vh-100'>
         <Banner
                title="404 - Not found"
                subtitle="The page you are looking for cannot be found"
                btnVariant="danger"
                buttonText="Back home"
                linkTo="/"
            />
        </div>
	)
}
