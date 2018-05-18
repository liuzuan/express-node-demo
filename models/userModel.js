import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String
});

const model = mongoose.model('user', userSchema);

export default model;
