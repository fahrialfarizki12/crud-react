import React from "react";
import { Link } from "react-router";
function NotFound() {
  return (
    <>
      <h1 className="text-xl font-bold text-center mt-12">
        Halaman Tidak Ditemukan 404
      </h1>
      <p className="text-center">
        Silakan Kembali Ke Halaman <Link to="/" className="underline">Home</Link>
      </p>
    </>
  );
}

export default NotFound;
