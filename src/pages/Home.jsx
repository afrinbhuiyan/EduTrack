import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { HeadProvider } from "react-head";

const Home = () => {
  return (
    <div>
      <HeadProvider>
        <title>EduTrack | Home</title>
        <meta name="description" content="Welcome to home page" />
      </HeadProvider>
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
