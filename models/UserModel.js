let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let Schema = mongoose.Schema;


let UserSchema = new Schema({
    email: {
        type:String,
        required:[true,"Must provide an email"],
        unique:true
    },
    password: {
        type:String,
        required:[true,"Must provide a password"],
        minlength:[2, "Password must have more than 2 chars"]
    },
    fullName: {
        type:String,
        required:[true,"Must provide your name"]
    },
    birthDate: { 
        type:Date,
        required:[true,"Must provide a birth date "]
    },
    permission: {
      type: String,
      enum: ['user','admin'],
      default:'user'
    },
    favoriteFlatList: {
        type:[mongoose.Schema.Types.ObjectId],
        default:[]
    },
    created:{
        type:Date,
        default: Date.now
    },
    updated:{
        type:Date,
        default: Date.now
    },
    passwordChangeToken:String,
    modified: Date,
},
{
    versionKey:false
}
)

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  let salt = bcrypt.genSaltSync(12); //cate runde de encriptare o sa foloseasca 
  this.password = bcrypt.hashSync(this.password, salt); // functia care face encriptarea
  next();
});

module.exports = mongoose.model("user", UserSchema);