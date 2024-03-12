const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : {type : String, required : false},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : false},
    role: {type : String, default: 'tutor'},
    avatar: {type : String, default: 'user_placeholder.webp'},
    cover: {type : String, default: 'user_placeholder.webp'},
    bio: {type : String, default: 'Hello, I am a tutor'},
    description: {type : String, default: 'I am a tutor'},
    curriculam: {type : Array, default: []},
    education: {type : Object},
    experience: {type : Number, default: 0},
    subject: {type : String},
    pricing: {type : Number, default: 0},
    createdAt: Date
});

module.exports = model('tutor', myschema);

