module.exports = {
  HOST: "localhost",
  USER: "dev",
  PASSWORD: "Asdfg@123#",
  DB: "bravocare_testing",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
