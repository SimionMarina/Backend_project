let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");

//mailtrap connection
const email_username = "97179b1767139b";
const email_password = "fbdfe378b35b0b";
const email_host = "sandbox.smtp.mailtrap.io";
const email_port = "2525";

exports.auth = function (plainPassword, encrytedPassword) {
  return bcrypt.compareSync(plainPassword, encrytedPassword);
};
exports.signToken = function (userID) {
  const secret = process.env.JWT_SECRET || "Marina";
  const token = jwt.sign({ id: userID }, secret, { expiresIn: 3600 });
  return token;
};
exports.decodeToken = function (token) {
  let decodedToken = jwt.decode(token, "Marina");
  return decodedToken;
};
exports.sendEmail = async function (options) {
  let transport = nodemailer.createTransport({
    host: email_host,
    port: email_port,
    auth: {
      user: email_username,
      pass: email_password,
    },
  });
  const mail = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  await transport.sendMail(mail);
};
exports.verifyToken = function (token) {
  try {
    let result = jwt.verify(token, "Marina");
    return result;
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return false;
  }
};

exports.isTokenExpired = function (token) {
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) return true; // Invalid or missing expiration
  return Date.now() >= decoded.exp * 1000; // JWT exp is in seconds
};
