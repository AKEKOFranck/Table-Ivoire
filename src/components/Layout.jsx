import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Like from '../components/Like';


export default function Layout() {
 
  return (
    <div className="app">
     <Header/>
      <main>
        <Outlet  />
        <Like/>
      </main>
     <Footer/>
    </div>
  );
}