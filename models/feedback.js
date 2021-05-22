
const mongoose = require('mongoose')

const feedbackSchema  = new mongoose.Schema({

    name: { type: String, required:true },

    photo:{ data: Buffer,contentType: String },

    comment:{ type: String, required: true,maxlength: 200 }

},
    { timestamps:true}
)

module.exports = mongoose.model('Feedback',feedbackSchema)