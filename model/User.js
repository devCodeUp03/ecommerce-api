const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async (value) => {
                let matched = await mongoose.models.User.findOne({email: value});
                if(matched) {
                    return false;
                }
            },
            message: "email already exists chutiya, koi naya email daal"
        }
    },
    password: {
        type: String,
        required: true
    }, 
    phone: Number,
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        required: true, 
        set: (value) => {
            console.log(value)
            return value.toLowerCase()
        }
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
