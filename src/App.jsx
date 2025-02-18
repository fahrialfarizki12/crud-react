import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Table from "./components/Table";

function App() {
  return (
    <>
      <div className="container mx-auto px-[5%] min-h-screen">
        <Header />
        <Table />
      </div>
      <Footer />
    </>
  );
}

export default App;
