const mongoose = require('mongoose');
const bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;


const Schema = mongoose.Schema;
const users = new Schema ({
  email: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  date: {
    type: String,
    default: Date.now()
  },
  isClerk: Boolean
})
users.pre('save', function(next) {
    var user = this;
    // encrypt the password using salt, Change the cleartext password to hashed
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

users.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', users);
module.exports = User;
