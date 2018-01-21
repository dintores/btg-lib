var btgLib = require('@owstack/satoshi-common-lib');

// module information
btgLib.version = 'v' + require('../package.json').version;

btgLib.crypto.Signature.SIGHASH_FORKID = 0x40;

var Constants = require('./common/constants');
btgLib.Constants = Constants;

btgLib.Networks.remove(btgLib.Networks.livenet);
btgLib.Networks.remove(btgLib.Networks.testnet);

btgLib.Networks.add({
  chainName: Constants.CHAIN_NAME,
  chainSymbol: Constants.CHAIN_SYMBOL,
  name: Constants.LIVENET,
  alias: Constants.LIVENET_ALIAS,
  pubkeyhash: 0x26,
  privatekey: 0x80,
  scripthash: 0x17,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  networkMagic: 0xe3e1f3e8,
  port: 8333,
  dnsSeeds: [
    'eu-dnsseed.bitcoingold-official.org',
    'dnsseed.bitcoingold.org',
    'dnsseed.btcgpu.org'
  ]
});

function addTestnet() {
    btgLib.Networks.add({
      chainName: Constants.CHAIN_NAME,
      chainSymbol: Constants.CHAIN_SYMBOL,
      name: Constants.TESTNET,
      alias: Constants.TESTNET_ALIAS,
      pubkeyhash: 0x6f,
      privatekey: 0xef,
      scripthash: 0xc4,
      xpubkey: 0x043587cf,
      xprivkey: 0x04358394,
      networkMagic: 0xf4e5f3f4,
      port: 18333,
      dnsSeeds: [
        'eu-test-dnsseed.bitcoingold-official.org',
        'test-dnsseed.bitcoingold.org',
        'test-dnsseed.btcgpu.org',
        'btg.dnsseed.minertopia.org'
      ]
    });
}

function addRegtest() {
    btgLib.Networks.add({
      chainName: Constants.CHAIN_NAME,
      chainSymbol: Constants.CHAIN_SYMBOL,
      name: Constants.TESTNET,
      alias: Constants.TESTNET_ALIAS,
      pubkeyhash: 0x6f,
      privatekey: 0xef,
      scripthash: 0xc4,
      xpubkey: 0x043587cf,
      xprivkey: 0x04358394,
      networkMagic: 0xdab5bffa,
      port: 18444,
      dnsSeeds: []
    });
}

btgLib.Networks.enableRegtest = function enableRegtest() {
  btgLib.Networks.remove(btgLib.Networks.testnet);
  addRegtest();
  btgLib.Networks.testnet = btgLib.Networks.get(Constants.TESTNET);
  btgLib.Networks.testnet.regtestEnabled = true;
}

btgLib.Networks.disableRegtest = function disableRegtest() {
  btgLib.Networks.remove(btgLib.Networks.testnet);
  addTestnet();
  btgLib.Networks.testnet = btgLib.Networks.get(Constants.TESTNET);
  btgLib.Networks.testnet.regtestEnabled = false;
}

addTestnet();

btgLib.Networks.defaultNetwork = btgLib.Networks.get(Constants.LIVENET);
btgLib.Networks.livenet = btgLib.Networks.get(Constants.LIVENET);
btgLib.Networks.mainnet = btgLib.Networks.get(Constants.LIVENET);
btgLib.Networks.testnet = btgLib.Networks.get(Constants.TESTNET);

module.exports = btgLib;
