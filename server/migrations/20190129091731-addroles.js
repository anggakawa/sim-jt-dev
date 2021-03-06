'use strict';

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
  const arrayofdata = [
    [1, 'admin'], 
    [2, 'user'], 
    [3, 'vendor']
  ]
  arrayofdata.forEach(array => {
    db.insert('roles', ['role_id', 'role_name'], array);
  });
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
