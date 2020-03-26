import React, { useState } from "react";
import "./styles.css";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import heroesimg from "../../assets/heroes.png";

export default function Logon() {
  const [id, setID] = useState("");
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const resp = await api.post("sessions", { id });

      localStorage.setItem("ongID", id);
      localStorage.setItem("ongName", resp.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setID(e.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesimg} alt="Heroes" />
    </div>
  );
}
