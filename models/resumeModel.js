import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    username: String,
    message: String,
    time: String,
})

const model = mongoose.model('resume', resumeSchema);

export default model;