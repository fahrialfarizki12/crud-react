import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://crud-api-fahri.vercel.app";

  const { id } = useParams();
  const navigate = useNavigate();

  // Fungsi untuk mengambil data pengguna berdasarkan ID
  const fetchUser = async () => {
    try {
      const response = await axios.get(API + "/users/" + id);
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password || ""); // Mengisi password jika ada (untuk testing)
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Gagal mengambil data pengguna!",
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  };

  // Mengambil data pengguna saat komponen pertama kali di-render
  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(API + "/users/" + id, {
        name,
        email,
        password,
      });
      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diubah!",
        icon: "success",
        confirmButtonText: "Oke",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data!",
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  };

  return (
    <>
      <h1 className="mt-12 text-center">Update Akun</h1>
      <div className="flex justify-center mt-5">
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="floating-label">
              <span>Masukan Nama</span>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Masukan Nama"
                className="w-full input input-md"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="floating-label">
              <span>Masukan Email</span>
              <input
                type="email"
                placeholder="Masukan Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full input input-md"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="floating-label">
              <span>Masukan Password</span>
              <input
                type="password"
                placeholder="Masukan Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full input input-md"
              />
            </label>
          </div>

          <button className="w-full text-white btn bg-slate-900">Update</button>
        </form>
      </div>
    </>
  );
}

export default Update;
