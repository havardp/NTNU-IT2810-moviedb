import React from "react";
import Navbar from "../components/Navbar.jsx";
import MainView from "../components/MainView.jsx"
import HamburgerMeny from "../components/HamburgerMeny.jsx"

//note, the hamburgermeny component is just the actual sidebar, the button to toggle it is inside the navbar component
const Home = () => {
  document.body.style.backgroundColor = "#414141";
  return (
    <>
      <Navbar/>
      <HamburgerMeny/>
      <MainView/>
    </>
  );
}

export default Home
