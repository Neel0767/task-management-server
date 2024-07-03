const Joi = require('joi')

export const register = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}

export const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}
export const refreshToken = {
  body: {
    refreshToken: Joi.string().required(),
  },
}
