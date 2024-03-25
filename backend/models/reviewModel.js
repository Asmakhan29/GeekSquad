const {Schema, model, Types} = require('../connection');

const myschema = new Schema({
    user : {type : Types.ObjectId, ref : 'users'},
    tutor: {type : Types.ObjectId, ref : 'tutors'},
    rating: {type : Number},
    review : {type : String},
    createdAt: Date
});

module.exports = model('reviews', myschema);

