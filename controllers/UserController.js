let UserModel = require("../models/UserModel");
let utils = require("../utils/utils");

exports.createUser = function (req, res, next) {
  let newUser = req.body;
  let user = new UserModel(newUser);
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ err: err });
    });
};
exports.loginUser = function (req, res, next) {
  let loginInfo = req.body;
  UserModel.find({ email: loginInfo.email }).then((data) => {
    if (data[0].password) {
      if (utils.auth(loginInfo.password, data[0].password)) {
        res.json({ status: utils.signToken(data[0]._id) });
      } else {
        res.json({ status: "Loggin failed!" });
      }
    } else {
      res.json({ error: "Something went wrong!" });
    }
  });
};
exports.getUserbyID = function (req, res, next) {
  res.json({ data: req.user, error: req.error });
};
exports.getAllUsers = function (req, res, next) {
  if (req.user && !req.error) {
    UserModel.find().then((data) => {
      res.json(data);
    });
  }
};
exports.deleteUser = function (req, res, next){
  let id = req.params.id;
  UserModel.findByIdAndDelete(id)
  .then((data) =>{
    res.status(201).json({message:"User deleted", data:data});
  })
  .catch((error) =>{
    res.json({error: error});
  });
}
exports.updateUser = function (req, res, next){
  let id = req.params.id;
  UserModel.findByIdAndUpdate(id, req.body,{
    new: true,
    runValidators: true,
  })
  .then((data) => {
    res.json({ data: data });
  })
  .catch((error) => {
    res.json({ error: error });
  });
}
exports.verifyToken = function (req, res, next) {
  let token = "";
  if (req.headers.authorization) {
    token = req.headers.authorization;
    let decodedToken = utils.decodeToken(token);
    if (decodedToken) {
      let userId = decodedToken.id;
      UserModel.findById(userId)
        .then((data) => {
          req.user = data;
          next();
        })
        .catch((err) => {
          req.error = "User cannot be found";
          next();
        });
    } else {
      req.error = "Token cannot be decoded";
      next();
    }
  } else {
    req.error = "No token supplied";
    next();
  }
};
exports.isAdmin = function (req, res, next) {
  console.log(req.user);
  if (req.user.permission == "user") {
    next();
  } else {
    res.status(400).json({ error: "you dont have permission" });
  }
};
exports.forgotPassword = async function (req, res, next) {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.json({ error: "Please specify email!" });
      return;
    }
    let resetToken = utils.signToken(user._id);
    user.passwordChangeToken = resetToken;
    await user.save();

    let url = `${req.protocol}:/${req.get("host")}/resetPassword/${resetToken}`;
    let message = "Click on the link to reset your password: ";
    await utils.sendEmail({
      from: "myapplication@noreply.com",
      email: user.email,
      subject: "Reset password",
      text: `${message} \r\n ${url}`,
    });
    res.json({ message: "Sent email!" });
  } catch {
    user.passwordChangeToken = undefined;
    user.save();
    res.json({ error: "Email cound not be sent!" });
  }
};
exports.resetPassword = async function(req,res,next){
  let token = req.params.token;
  if(utils.verifyToken(token)){
    let user = await UserModel.findOne({passwordChangeToken:token});
    if(!user){
      res.json({error:"User does not exist or has not requested password change"});
      return;
    }
    user.password = req.body.password;
    user.passwordChangeToken = undefined;
    await user.save();
    let newToken = utils.signToken(user._id);
    res.json({status: newToken});
  }
}