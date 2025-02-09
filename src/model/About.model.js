const mongoose = require('mongoose');
const validator = require('validator'); // Import validator package

const AboutSchema = new mongoose.Schema({
    AboutImage: {
        type: String,
        required: [true, 'About Image is required'],
        validate: {
            validator: function (value) {
                return validator.isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true });
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

const About = mongoose.model('AboutIMG', AboutSchema);

module.exports = About;
