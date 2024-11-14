import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import useToast from "../hooks/useToast";

import "./Form.css";

const EditParty = () => {
  const id = useParams();

  const [party, setParty] = useState(null);

  if (!party) return <p>Carregando...</p>;

  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load services
    const loadServices = async () => {
      const res = await partyFetch.get("/services");

      setServices(res.data);
    };
    loadServices();

    // Load Party
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);

      setParty(res.data);
    };

    loadParty();
  }, []);

  const upadateParty = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-page">
      <h2>Editando: {party.title}</h2>
      <p>Ajuste as informações da sua festa</p>
      <form onSubmit={(e) => upadateParty(e)}>
        <label>
          <span>Nome da festa:</span>
          <input
            type="text"
            placeholder="Seja criativo..."
            required
            value={party.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Anfitrião:</span>
          <input
            type="text"
            placeholder="Quem está dando a festa?"
            required
            value={party.author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder="Conte mais sobre a festa..."
            required
            value={party.description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type="number"
            placeholder="Quanto você pretende investir?"
            required
            value={party.budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder="Insira a URL de uma imagem"
            required
            value={party.image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">{service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => handleServices(e)}
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Criar Festa" className="btn" />
      </form>
    </div>
  );
};

export default EditParty;
