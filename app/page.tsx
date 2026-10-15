import Image from "next/image";
import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { Hero } from "./components/Hero";

export default function Home() {
  return (
    <>
   
     <Header/>
      <Hero/>
     <Catalog/>
    </>
  );
}
