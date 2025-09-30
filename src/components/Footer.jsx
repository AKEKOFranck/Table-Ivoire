import '../styles/Footer.css';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdOutlineFoodBank } from "react-icons/md";




export default function Footer() {
    const navData = [
        {
            id: 1,
            icons: <Link to= "">  <IoMdHome className='foot_ico' /> </Link>,
            text: "Accueil"
        },

        {
            id: 2,
            icons: <Link to= ""> <MdOutlineFoodBank className='foot_ico' /> </Link>,
            text:  (
            <>
                Espace
                <p>restaurant</p>
            </>
            ), 
        },

        {
            id: 3,
            icons: <Link to= ""> <RiCustomerService2Line className='foot_ico' /> </Link>,
            text: "Service client"
        },
    ];
   
    return(
        <footer className='foot_main'>
            {navData.map((nav) =>(
                <div className='foot_box' key={nav.id}>
                    {nav.icons}
                   <h4 className='foot_text'>
                    {nav.text}
                   </h4>
                </div>
            ))}
        </footer>
    )
}