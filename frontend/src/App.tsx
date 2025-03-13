import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./organisms/Footer";
import Header from "./organisms/Header";


function App() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>

  );
}

export default App
