const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://eduardoliracunha17:lqoG838vyLh6XDLE@cluster0.fa6f2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database on")
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
};

module.exports = main;
