const { User, Castomer, Manager } = require("../models");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const crypto = require("crypto");
const tokenService = require("./../service/token-service");
const { sendEmail } = require("../service/emailConfik");
const { schemaRegister } = require("../schema");

class MainController {
  static async register(req, res, next) {
    try {
      const { error, value } = schemaRegister.validate(req.body);
      if (error) {
        return res.status(400).send({ value, error: error.details });
      } else {
        const { name, surname, email, password, type } = req.body;
        const canditate = await User.findOne({ where: { email: email } });
        if (canditate) {
          return res.status(401).send(`${email} is already exist!`);
        }
        const emailToken = await crypto
          .randomBytes(3)
          .toString("hex")
          .toUpperCase();
        const user = await User.create({
          name,
          surname,
          email,
          password: bcrypt.hashSync(password, 10),
          emailToken,
          type,
        });

        if (type == 0) {
          await Castomer.create({ userId: user.id });
        } else if (type == 1) {
          await Manager.create({ userId: user.id });
        }

        const url = `http://localhost:8080/verify?email=${email}&emailToken=${emailToken}`;
        sendEmail({
          to: email,
          subject: "Registr",
          html: `<p>Hello my dear ${name}</p><a href="${url}">Click</a>`,
        });
        const userDto = new UserDto({ ...user.dataValues });
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        userDto.refreshToken = tokens.refreshToken;
        res.cookie("refreshToken", userDto.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.send(userDto);
      }
    } catch (e) {
      next(e);
    }
  }
  static async login(req, res) {
    try {
      if (req.user.isVerified == 1) {
        if (req.user.isBlocked == 0) {
          let comp = bcrypt.compareSync(req.body.password, req.user.password);
          if (comp) {
            const userDto = new UserDto(req.user);
            const tokens = await tokenService.generateToken({
              ...userDto,
            });
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            res.cookie("refreshToken", tokens.refreshToken, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
            userDto.refreshToken = tokens.refreshToken;
            res.send(userDto);
          } else {
            res.send({
              error: "Wrong Username and/or Password",
            });
          }
        } else {
          res.send({
            isBlocked: "You are blocked",
          });
        }
      } else {
        res.send({
          verify: "You have to verify your email",
        });
      }
    } catch (err) {}
  }
  static async isVerify(req, res) {
    try {
      console.log(req.query);
      const { email, emailToken } = req.query;
      const us = await User.findOne({ where: { email, emailToken } });
      if (us) {
        await User.update(
          { isVerified: 1, emailToken: "" },
          {
            where: { id: us.id },
          }
        );
        res.send({ message: "success" });
      } else {
        res.send({ message: "error, email not found" });
      }
    } catch (err) {}
  }
  static async sendForgotEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await User.findOne({ where: { email } });
      if (user) {
        const code = await crypto.randomBytes(3).toString("hex").toUpperCase();
        const html = `your code - ${code}`;
        await User.update({ emailToken: code }, { where: { email } });
        sendEmail({ to: email, subject: "Forgot Password", html });
        return res.send({ message: "sucsess" });
      } else {
        return res.send({ message: "email not found" });
      }
    } catch (err) {}
  }

  
}
module.exports = { MainController };

