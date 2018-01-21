'use strict';

var btgLib = require('./lib');

var Sighash = require('./lib/transaction/sighash');
btgLib.Transaction.Sighash.sighash = Sighash.sighash;
btgLib.Transaction.Sighash.sign = Sighash.sign;
btgLib.Transaction.Sighash.verify = Sighash.verify;
btgLib.Transaction.UnspentOutput = require('./lib/transaction/unspentoutput');

btgLib.URI = require('./lib/uri');
btgLib.Unit = require('./lib/unit');

// Internal usage, exposed for testing/advanced tweaking
btgLib.Transaction.sighash = require('./lib/transaction/sighash');

module.exports = btgLib;
