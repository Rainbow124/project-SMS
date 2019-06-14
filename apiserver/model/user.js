
//引入mongoose模块

const db = require('../config/db');

const schema = db.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    avater:{
        type: String,
        default: 'http://localhost:3436/Rainbow.jpg'
    },
    sex:{
        type: Number,
        default: 0
    },
    age:{
        type: Number,
        default: 18
    }
});

module.exports = db.model('user',schema);