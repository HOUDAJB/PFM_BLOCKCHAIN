const Payment = artifacts.require("Payment");
module.exports = async function (deployer, network, accounts) {
  // Deploy Payment with the first Ganache account as recipient
  await deployer.deploy(Payment, accounts[0]);
};
