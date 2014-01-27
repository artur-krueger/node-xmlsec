var wrapper = require('node-binary-wrapper');
var util = require('util');

function xmlsec(source,dest) {
  if (!(this instanceof xmlsec)) 
    return new xmlsec(source,dest);
  wrapper.call(this,"xmlsec1");
  this._from='/dev/stdin';
    
  source && this.from(source);
  dest && this.to(dest);
}

util.inherits(xmlsec,wrapper);

xmlsec.prototype.privkeyPem = function(path) {
  this.addArgs("--privkey-pem",path);
  return this;
};

xmlsec.prototype.pubkeyCertPem = function(path) {
  this.addArgs("--pubkey-cert-pem",path);
  return this;
};

xmlsec.prototype.from = function (path) {
  this._from=path;
  return this;
};

xmlsec.prototype.to = function (path) {
  this.addArgs("--output",path);
  return this;
};

xmlsec.prototype.spawn = function() {
  this.addArgs(this._from);
  xmlsec.super_.prototype.spawn.apply(this);
  return this;
};

xmlsec.prototype.sign = function(source) {
  source && this.from(source);
  this.prependArgs("--sign");
  this.spawn();
};

xmlsec.prototype.verify = function(source) {
  source && this.from(source);
  this.prependArgs("--verify");
  this.spawn();
};

xmlsec.prototype.encrypt = function(source) {
  source && this.from(source);
  this.prependArgs("--encrypt");
  this.spawn();
};

xmlsec.prototype.decrypt = function(source) {
  source && this.from(source);
  this.prependArgs("--decrypt");
  this.spawn();
};


module.exports = exports = xmlsec;
