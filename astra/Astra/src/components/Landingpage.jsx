import React from "react";
import Hero from "../Landingpage/Hero";
import Gallery from "../Landingpage/Gallery";
import { Features } from "../Landingpage/Features";
import Timeline from "../Landingpage/Timeline";
import Navbar from "../Landingpage/Navbar";
import Pricing from "../Landingpage/Pricing";
import Footer from "../Landingpage/Footer";
import AstraFAQ from "../Landingpage/FAQ";
import Ticker from "../Landingpage/Ticker";
import Showcase from "../Landingpage/Showcase";

function Landingpage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Gallery />
      <Showcase />
      <Features />
      <Timeline />
      <Pricing />

      <AstraFAQ />
      <Ticker />
      <Footer />
    </div>
  );
}

export default Landingpage;
