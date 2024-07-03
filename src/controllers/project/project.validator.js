const Joi = require('joi')

export const addProject = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    teamId: Joi.string().required(),
  },
}

export const updateProject = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
  },
}
