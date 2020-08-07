onst Schema = mongoose.Schema;
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
  }
})

const User = mongoose.model('User', users);
module.exports = User;
