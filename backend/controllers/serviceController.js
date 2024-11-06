const { Service: ServiceModel } = require("../models/Service");

const serviceController = {
  // post
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ServiceModel.create(service);

      res.status(201).json({ response, msg: "Serviço criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  //  retorna todos os serviços:
  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

      res.json(services);
    } catch (error) {
      console.log(error);
    }
  },
  //  retorna os serviços de forma individual:
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const service = await ServiceModel.findById(id);
      
    // validação caso o serviço nao seja encontrado:
      if(!service) {
        res.status(404).json({msg: "Serviço nao encontrado!!!"});

        return;
      }

      res.json(service);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = serviceController;
