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
    [1, 'next'], 
    [2, 'alternate'], 
    [3, 'go back']
  ]
  arrayofdata.forEach(array => {
    db.insert('option_value', ['option_value_id', 'value_description'], 
      array);
  });
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
