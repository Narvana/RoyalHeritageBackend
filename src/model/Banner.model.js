const mongoose = require('mongoose');
const validator = require('validator'); // Import validator package

const BannerSchema = new mongoose.Schema({
    BannerImage: {
        type: String,
        required: [true, 'Banner Image is required'],
        validate: {
            validator: function (value) {
                return validator.isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true });
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
