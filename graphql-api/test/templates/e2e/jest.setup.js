const global = require("./jest.globals")();
module.exports = async () => {
  console.info("\nChecking for the target service to work...");
  await global.awaitTestReady();
  console.info("OK");
  await global.pause(250);
};
