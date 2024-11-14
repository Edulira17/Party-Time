import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "./Form.css"

const CreateParty = () => {
  const [services, setServices] = useState([])

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [image, setImage] = useState("")
  const [partyServices, setPartyServices] = useState([])

  const navigate = useNavigate()

  // Load services 
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");

      setServices(res.data)
    }
    loadServices();
  }, [])

  // Add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;

    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value)

    console.log(filteredService)

    if (checked) {
      setPartyServices((services) => [...services, filteredService[0]]);
    } else {
      setPartyServices((services) => services.filter((s) => s._id !== value));
    }

    console.log(partyServices)
  }

  // Create a new party
  const createParty = async (e) => {
    e.preventDefault();

    const party = {
      title,
      author,
      description,
      budget,
      image,
      services: partyServices
    }

    const res = await partyFetch.post("/parties", party);

    if(res.status === 201){
      navigate("/")
    }
  }

  return (
    <div className="form-page">
      <h2>Crie sua próxima Festa</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span>Nome da festa:</span>
          <input
            type="text"
            placeholder="Seja criativo..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Anfitrião:</span>
          <input
            type="text"
            placeholder="Quem está dando a festa?"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder="Conte mais sobre a festa..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type="number"
            placeholder="Quanto você pretende investir?"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder="Insira a URL de uma imagem"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 && services.map((service) => (
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

export default CreateParty;
