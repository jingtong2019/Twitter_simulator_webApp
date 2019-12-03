var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//schema
MessageSchema = new Schema({
  from: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: ''
  },
  timestamp: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  }
 
});
    
module.exports = mongoose.model('Messages', MessageSchema); 