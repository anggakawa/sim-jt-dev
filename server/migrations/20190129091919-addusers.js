'use strict';

const encryption = require('../utilities/util.encryption.js');

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.insert('users', ['user_id', 'username', 'password', 'role_id', 'user_description'], 
    [1, 'admin', encryption.encrypt('password'), 1, 'ya admin dia']);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
