const mongoose = require("mongoose");
const dbPath = "mongodb+srv://vendy:4cfSDLPRdy%40B%23e%2A@vendy-ruokw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', console.error.bind(console, 'MongoDB connected:'));
module.exports = mongoose;