
import { Link } from 'react-router-dom';

export default function Footer() {

    let replaceDate = () => {
        let modate = document.lastModified;
        const updatedDates = document.querySelectorAll("#w-update");
    
        for (let i = 0; i < updatedDates.length; i++) {
            modate = document.querySelectorAll("#w-update").innerHTML = "Updated last: " + new Date(modate).toString();
            updatedDates[i].innerHTML = modate;
        }
    }
    replaceDate();

    return(

        <footer id="footer" className="px-3 py-2 d-flex align-items-end justify-content-between">
        <div className="text-white">
            Copyright &copy; 2023 by <Link className="icon-glow" href="https://m-dorio.github.io/webportfolio/">mdorio.</Link> | All rights Reserved.
            </div>   
        <div className="text-white">
            <small id="w-update" className="text-white"></small>
        </div>  
        </footer>
      
    )
}