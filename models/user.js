const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//add bcrypt library to hash password
const bcrypt = require("bcrypt");

//SALT_ROUNDS determine how much processing time it will take to perform the hash
const SALT_ROUNDS = 6;

//here is our user model
const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            minLength: 3,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    }
);

userSchema.pre("save", function (next) {
    //Save the reference to the user doc
    const user = this;
    if (!user.isModified("password")) return next();
    //password has been change - salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
        if (err) return next(err);
        //update the password property with the hash
        user.password = hash;
        return next();
    });
});

module.exports = mongoose.model("User", userSchema);
