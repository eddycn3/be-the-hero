import React, { useEffect, useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import "./styles.css";

export default function Profile() {
  const history = useHistory();

  const [incidents, setIncidents] = useState([]);
  const ongID = localStorage.getItem("ongID");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api.get("profile", { headers: { Authorization: ongID } }).then(resp => {
      setIncidents(resp.data);
    });
  }, [ongID]);

  async function handleDeleteIncident(id) {
    try {
      const resp = await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongID }
      });

      switch (resp.status) {
        case 401:
          console.log(resp.data.error);
          break;
        case 400:
          console.log(resp.data.error);
          break;
        case 204:
          setIncidents(incidents.filter(incident => incident.id !== id));
          break;

        default:
      }
    } catch (err) {
      alert("Erro ao deletar caso");
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÂO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
