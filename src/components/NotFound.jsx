import React from "react";
import { Link } from "react-router";
function NotFound() {
  return (
    <>
      <h1 className="text-xl font-bold text-center">
        Halaman Tidak Ditemukan 404
      </h1>
      <p>
        Silakan Kembali Ke Halaman <Link to="/" className="underline">Home</Link>
      </p>
    </>
  );
}

export default NotFound;
