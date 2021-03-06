'use strict';

var expect = require('chai').expect;
var should = require('chai').should();

var btgLib = require('..');
var Constants = btgLib.Constants;
var networks = btgLib.Networks;

describe('Networks', function() {

  var customnet;

  it('should contain all Networks', function() {
    should.exist(networks.livenet);
    should.exist(networks.testnet);
    should.exist(networks.defaultNetwork);
  });

  it('will enable/disable regtest Network', function() {
    networks.enableRegtest();
    networks.testnet.networkMagic.should.deep.equal(new Buffer('dab5bffa', 'hex'));
    networks.testnet.port.should.equal(18444);
    networks.testnet.dnsSeeds.should.deep.equal([]);
    networks.testnet.regtestEnabled.should.equal(true);

    networks.disableRegtest();
    networks.testnet.networkMagic.should.deep.equal(new Buffer('f4e5f3f4', 'hex'));
    networks.testnet.port.should.equal(18333);
    networks.testnet.dnsSeeds.should.deep.equal([
      'testnet-seed.bitcoinabc.org',
      'testnet-seed-abc.bitcoinforks.org',
      'testnet-seed.bitcoinunlimited.info',
      'testnet-seed.bitprim.org',
      'testnet-seed.deadalnix.me'
    ]);
  });

  it('will get network based on string "regtest" value', function() {
    var network = networks.get(Constants.TESTNET_ALIAS);
    network.should.equal(networks.testnet);
  });

  it('should be able to define a custom Network', function() {
    var custom = {
      name: 'customnet',
      alias: 'mynet',
      pubkeyhash: 0x10,
      privatekey: 0x90,
      scripthash: 0x08,
      xpubkey: 0x0278b20e,
      xprivkey: 0x0278ade4,
      networkMagic: 0xe7beb4d4,
      port: 20001,
      dnsSeeds: [
        'localhost',
        'mynet.localhost'
      ]
    };
    networks.add(custom);
    customnet = networks.get('customnet');
    for (var key in custom) {
      if (key !== 'networkMagic') {
        customnet[key].should.equal(custom[key]);
      } else {
        var expected = new Buffer('e7beb4d4', 'hex');
        customnet[key].should.deep.equal(expected);
      }
    }
  });

  it('can remove a custom network', function() {
    networks.remove(customnet);
    var net = networks.get('customnet');
    should.equal(net, undefined);
  });

  it('should not set a network map for an undefined value', function() {
    var custom = {
      name: 'somenet',
      pubkeyhash: 0x13,
      privatekey: 0x93,
      scripthash: 0x11,
      xpubkey: 0x0278b20f,
      xprivkey: 0x0278ade5,
      networkMagic: 0xe7beb4d5,
      port: 20008,
      dnsSeeds: [
        'somenet.localhost'
      ]
    };
    networks.add(custom);
    var network = networks.get(undefined);
    should.not.exist(network);
    networks.remove(custom);
  });

  var constants = ['name', 'alias', 'pubkeyhash', 'scripthash', 'xpubkey', 'xprivkey'];

  constants.forEach(function(key){
    it('should have constant '+key+' for livenet and testnet', function(){
      networks.testnet.hasOwnProperty(key).should.equal(true);
      networks.livenet.hasOwnProperty(key).should.equal(true);
    });
  });

  it('tests only for the specified key', function() {
    expect(networks.get(0x6f, 'pubkeyhash')).to.equal(networks.testnet);
    expect(networks.get(0x6f, 'privatekey')).to.equal(undefined);
  });

  it('can test for multiple keys', function() {
    expect(networks.get(0x6f, ['pubkeyhash', 'scripthash'])).to.equal(networks.testnet);
    expect(networks.get(0xc4, ['pubkeyhash', 'scripthash'])).to.equal(networks.testnet);
    expect(networks.get(0x6f, ['privatekey', 'port'])).to.equal(undefined);
  });

  it('converts to string using the "name" property', function() {
    networks.livenet.toString().should.equal(Constants.LIVENET);
  });

  it('network object should be immutable', function() {
    expect(networks.testnet.name).to.equal(Constants.TESTNET)
    var fn = function() { networks.testnet.name = Constants.LIVENET }
    expect(fn).to.throw(TypeError)
  });

});
