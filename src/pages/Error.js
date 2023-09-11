import Banner from '../components/Banner'


export default function Error() {

    const data = {
        title: "404 - Not found",
        subtitle: "The page you are looking for cannot be found",
        variant: "danger",
        buttonText: "Back home",
        linkTo: "./"
    }

    return (
        <>
        <div className='d-flex justify-content-around align-items-center text-center text-warning vh-100'>
            <Banner data={data}/>
        </div>

        </>
	)
}
