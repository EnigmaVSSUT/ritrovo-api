const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a Name']
    },
    description: {
        type: String
    },
    established: {
        type: Date,
        default: Date.now
    },
    membersCount: {
        type: Number
    },
    logo: {
        type: String
    },
    Achievements: {
        type: [String]
    },
    Events: {
        type: [String]
    },
    FacultyAdvisor: {
        type:String,
    },
    Coordinator: {
        type: String,
        required: true
    },
    AssistantCoordinator: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Club', clubSchema);
