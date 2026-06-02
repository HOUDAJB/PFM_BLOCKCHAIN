const Rectangle = artifacts.require("Rectangle");
module.exports = function (deployer) {
  // Deploy Rectangle with initial coords (0,0), longueur=5, largeur=3
  deployer.deploy(Rectangle, 0, 0, 5, 3);
};
