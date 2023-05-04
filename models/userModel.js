const mongoose=require('mongoose')

// Thiết lập schema cho người dùng
const userSchema = new mongoose.Schema({
      userId:{type: String,require: true},
      email: { type: String, required: true, unique: true },
      username: { type: String, required: true,},
      fullname: { type: String, required: true},
      phone: { type: String, required: true },
      address: { type: String, required: true },
      birthday: { type: Date, required: true },
      password: { type: String, required: true },
      otp: { type: String },
    // otpCreatedTime: { type: Date }
  });

// Tạo model cho người dùng
const User = mongoose.model('User', userSchema);
module.exports=User;