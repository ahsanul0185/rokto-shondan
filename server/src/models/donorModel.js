
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const donorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "User name is required."],
      trim: true,
      minlength: [3, "Too short name."],
      maxlength: [31, "Too lengthy name."],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required!"],
        unique: true,
        validate: {
          validator: (v) => {
            const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
            return phoneRegex.test(v);
          },
          message: "Please use a valid phone number!",
        },
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        lowercase: true,
        trim: true,
        validate: {
          validator: (v) => {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return emailRegex.test(v);
          },
          message: "Please use a valid email address!",
        },
    },
    donorType: {
        type: String,
        required: [true, "Donor type is required."],
    },
    bloodGroup: {
        type: String,
        required: [true, "Blood group is required."],
    },
    lastDonated: {
        type: String,
        required: [true, "Last donated date is required."],
    },
    district: {
        type: String,
        required: [true, "District is required."],
    },
    upazilla: {
        type: String,
        required: [true, "Upazilla is required."],
    },
    address: {
        type: String,
        required: [true, "Address is required."],
    },
    gender: {
        type: String,
        required: [true, "Gender is required."],
    },
    birthDate: {
        type: String,
        required: [true, "Date of birth is required."],
    },
      password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [6, "Password must be at least 6 characters long!"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
  donateStatus: {
    type: Boolean,
    default : true
      }
});

const donorModel = mongoose.model("donor", donorSchema);

module.exports = donorModel;