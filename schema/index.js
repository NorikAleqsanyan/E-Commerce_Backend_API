const Joi = require("joi");

module.exports = {
  schemaCategoryCreate: Joi.object({
    name: Joi.string().alphanum().max(30).required(),
  }),
  schemaCategoryUpdate: Joi.object({
    name: Joi.string().alphanum().max(30).required(),
  }),
  schemaSubCategoryCreate: Joi.object({
    name: Joi.string().max(30).required(),
    categoryId: Joi.number().integer().min(1).required(),
  }),
  schemaSubCategoryUpdate: Joi.object({
    name: Joi.string().max(30).required(),
    categoryId: Joi.number().integer().min(1).required(),
  }),
  schemaProductCreate: Joi.object({
    name: Joi.string().alphanum().max(30).required(),
    description: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).required(),
    count: Joi.number().min(0).integer().required(),
    subcategoryId: Joi.number().integer().min(1).required(),
  }),
  schemaProductUpdate: Joi.object({
    name: Joi.string().alphanum().max(30).required(),
    description: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).required(),
    count: Joi.number().min(0).integer().required(),
    subcategoryId: Joi.number().min(0).integer().required(),
  }),
  schemaLogin: Joi.object({
    username: Joi.string().alphanum().max(30).required(),
    password: Joi.string().min(6).max(12).required(),
  }),
  schemaRegister: Joi.object({
    name: Joi.string().alphanum().max(30).required(),
    surname: Joi.string().alphanum().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
    confirmPassword: Joi.ref("password"),
    type: Joi.number().integer().min(0).max(1).required(),
  }),
  schemaUpdatePassword: Joi.object({
    oldPassword: Joi.string().min(6).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    confirmPassword: Joi.ref("password"),
  }),
  schemaForgotPassword: Joi.object({
    code: Joi.string().min(6).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    confirmPassword: Joi.ref("password"),
  }),
  schemaUserData: Joi.object({
    name: Joi.string().alphanum().max(30).required(),
    surname: Joi.string().alphanum().max(30).required(),
  }),
  schemaManager: Joi.object({
    phoneNumber: Joi.string().required(),
    description: Joi.string().min(1).max(50).required(),
  }),
};
