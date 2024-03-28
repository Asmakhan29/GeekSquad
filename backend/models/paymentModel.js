const {Schema, model, Types} = require('../connection');

const myschema = new Schema({
    user : {type : Types.ObjectId, ref : 'users'},
    tutor: {type : Types.ObjectId, ref : 'tutor'},
    intentId : {type : String, required : true, unique : true},
    details: {type : Object, required : true},
    // hrs: {type : Number, required : true},
    createdAt: Date
});

module.exports = model('payment', myschema);

