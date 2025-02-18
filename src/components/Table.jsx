import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

function Table() {
  const [USERS, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const API = "https://crud-api-fahri.vercel.app";

  const getData = async () => {
    try {
      const response = await axios.get(API + "/users");
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const closeModal = () => {
    document.getElementById("my_modal_1").close();
    clearInput();
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [hidePassword, setHidePassword] = useState(false);

  const hidePasswordFun = () => {
    setHidePassword((prev) => !prev);
  };

  const clearInput = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API + "/users", {
        name,
        email,
        password,
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil ditambahkan!",
        icon: "success",
        confirmButtonText: "Okay",
      });

      closeModal();
      getData();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const hapusData = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Data akan dihapus secara permanen!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });
      if (result.isConfirmed) {
        await axios.delete(API + "/users/" + id);
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus!",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const editData = (id) => {
    navigate(`/update/${id}`);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-semibold ">Daftar Akun</h1>
        <button
          onClick={() => openModal()}
          className="text-white btn bg-slate-900"
        >
          Tambah Akun
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center ">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : USERS.length === 0 ? (
        <h1 className="text-2xl font-bold text-center">DATA TIDAK ADA</h1>
      ) : (
        <div className="overflow-x-auto border rounded-box border-base-content/5 bg-base-100">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {USERS.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td className="flex items-center gap-2">
                    <button
                      onClick={() => hapusData(item.id)}
                      className="fas fa-trash-can"
                    ></button>
                    <button
                      onClick={() => editData(item.id)}
                      className="fas fa-edit"
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL CREATE */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Tambah Akun</h3>
          <h1 className="font-semibold text-center text-white bg-red-500 rounded ">
            {error}
          </h1>
          <div className="py-6">
            <form onSubmit={handleForm}>
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Masukan Email"
                    className="w-full input input-md"
                  />
                </label>
              </div>
              <div className="mb-4 ">
                <label className="floating-label">
                  <span>Masukan Password</span>
                  <input
                    type={hidePassword ? "text" : "password"}
                    placeholder="Masukan Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="relative w-full input input-md"
                  />
                  <i
                    onClick={() => hidePasswordFun()}
                    className={`absolute right-1 top-3 fas ${
                      hidePassword ? "fa-eye" : "fa-eye-slash"
                    } `}
                  ></i>
                </label>
              </div>
              <button className="w-full text-white btn bg-slate-900">
                Create
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => closeModal()} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Table;
