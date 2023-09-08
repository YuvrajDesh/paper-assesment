const mongoose = require('mongoose');
const { Schema } = mongoose;
// Error was coming when use required ,unique properties on schema so i removed those properties
const AdminSchema = new Schema({
  name:  String ,
  email: {type :String,unique : true},
  password: String,
  date: { type: Date, default: Date.now }
  });
  const Admin = mongoose.model('admin', AdminSchema);
  Admin.createIndexes();
  module.exports = Admin;