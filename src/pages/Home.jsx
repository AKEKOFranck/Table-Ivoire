import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { FaTreeCity } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoRestaurant } from "react-icons/io5";
import { MdContactPhone } from "react-icons/md";





export default function Home() {

    const firstData = [
    {
        id: 1,
        ico: <FaTreeCity className='home_ico_first' />,
        title: "Choisir une commune",
    },
    {
        id: 2,
        ico: <BsFillBuildingsFill className='home_ico_first' />,
        title: "Choisir un quartier",
    },
    {
        id: 3,
        ico: <IoRestaurant className='home_ico_first' />,
        title: "Choisir un restaurant",
    },
    {
        id: 4,
        ico: <MdContactPhone className='home_ico_first' />,
        title: (
            <>
                Contacter le service client du resto
                <p>avant de vous y rendre</p>
            </>
        ),
    },
];

const secondData1 = [
    {
        id: 1 ,
        text: "Cocody" ,
        to: "/First",
    },

        {
        id:2 ,
        text: "Plateau" ,
        to: "",
    },

];


const secondData2 = [
    {
        id:1 ,
        text: "Treichville" ,
        to: "",
    },

        {
        id: 3,
        text: "Bingerville" ,
        to: "",
    },
];


const secondData3 = [
    {
        id:1 ,
        text:"Yopougon " ,
        to: "",
    },

     {
        id:2 ,
        text: "Port-Bouët" ,
        to: "",
    },
];


const secondData4 = [
    {
        id:1 ,
        text:"Koumassi" ,
        to: "",
    },

     {
        id:2 ,
        text: "Marcory" ,
        to: "",
    },
];


const secondData5 = [
     {
        id:1 ,
        text: "Abobo",
        to: "",
    },

        {
        id: 2,
        text: " Adjamé" ,
        to: "",
    },
];

const AllData = [
    secondData1,
    secondData2,
    secondData3,
    secondData4,
    secondData5,
];


    return(
        <section className='home_main'>

            <div className='home_container' id='explication'>
                <h2 className='home_title'>
                    Qu'est-ce que Table Ivoire ?
                </h2>

                <div className='home_cont_first'>
                    {firstData.map((first) =>(
                    <div className='home_cont_second' key={first.id}>
                        {first.ico}
                        <h4 className='home_first_text'>
                            {first.title}
                        </h4>
                    </div>
                    ))}
                </div>
            </div>

            <div className='home_container' id='title'>
                <h2 className='home_title'>
                    Choisir une commune
                </h2>
            </div>

            <div className='home_container' id='big_container'>
                 {AllData.map((Data, idx) => (
    <div className='home_cont' key={idx}>
        {Data.map((item) => (
            <Link  className='home_box' key={item.id} to= {item.to}>
               
                 Commune :
                <p>{item.text}</p>
                
            </Link>
        ))}
    </div>
))}
                <div className='home_cont'>
                
                </div>

            </div>
        </section>
    )
}