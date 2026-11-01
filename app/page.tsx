import Image from "next/image";
import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

export const instant = false;

export default function Home() {
  return (
    <>
   
     <Header/>
      {/*<Hero/>*/}
     <Catalog/>
     <Footer/>
    </>
  );
}
