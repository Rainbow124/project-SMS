
//引入mongoose

const db = require('../config/db');

const schema = db.Schema({
    studentName:{
        type:String,
        required:true
    },
    grade:{
      type:String,
      required: true
    },
    age:{
        type:Number,
        default: 18
    },
});

module.exports = db.model('student',schema);
