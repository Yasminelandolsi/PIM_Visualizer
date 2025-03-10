import Footer from "./Footer";
import Header from "./Header";
import Preheader from "./Preheader/Preheader";

import "./globals.css";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* <Preheader></Preheader> */}
      <Header></Header>
      <Footer />
    </div>
  );
}
