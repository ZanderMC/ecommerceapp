import { Header } from "./components/Header";
import { Catalog } from "./components/Catalog";
import { connection } from "next/server";

import { Footer } from "./components/Footer";

export const instant = false;
  
export default async function Home() {
  await connection();
  return (
    <>
      <Header />
      <main className="flex-1">
        <Catalog />
      </main>
      <Footer />
    </>
  );
}
