const Joi = require('joi')

export const addProject = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    teamId: Joi.string(),
  },
}

export const updateProject = {
  body: {
    title: Joi.string(),
    description: Joi.string(),
    teamId: Joi.string(),
  },
}
