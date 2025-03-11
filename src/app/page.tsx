

import Footer from "./Footer";
import Header from "./Header";
import Preheader from "./components/Preheader";
import SearchBar from "./components/SearchBar";

import "./globals.css";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <Preheader />
      <Header></Header>
      <SearchBar />
      <Footer />
    </div>
  );
}
