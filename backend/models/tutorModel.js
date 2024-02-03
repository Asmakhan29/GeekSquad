const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : {type : String, required : false},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : false},
    role: {type : String, default: 'user'},
    avatar: {type : String, default: 'user_placeholder.webp'},
    createdAt: Date
});

module.exports = model('tutor', myschema);

