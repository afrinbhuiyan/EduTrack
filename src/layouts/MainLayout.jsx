import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <main>
        {/* Main content goes here */}
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
};

export default MainLayout;