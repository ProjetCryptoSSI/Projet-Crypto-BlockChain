const Authentification = artifacts.require("Authentification");

module.exports = function(deployer) {
  deployer.deploy(Authentification);
};
