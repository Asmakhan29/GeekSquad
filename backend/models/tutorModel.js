const { Schema, model } = require('../connection');

const myschema = new Schema({
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, default: 'tutor' },
    avatar: { type: String, default: 'user_placeholder.webp' },
    cover: { type: String, default: 'user_placeholder.webp' },
    bio: { type: String, default: 'Hello, I am a tutor' },
    description: { type: String, default: 'I am a tutor' },
    education: { type: Object },
    experience: { type: Number, default: 0 },
    subject: { type: String, default: ''},
    pricing: { type: Number, default: 0 },
    location: { type: String, default: '' },
    availability: { type: Array, default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    timings: { type: Array, default: ['6AM-9AM', '9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM', '9PM-12AM'] },
    status: { type: String, default: 'available' },
    createdAt: Date
});

module.exports = model('tutor', myschema);

