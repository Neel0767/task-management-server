import Joi from 'joi'

export const addTeam = {
  body: {
    name: Joi.string().required(),
    description: Joi.string(),
    members: Joi.array().items(Joi.string()),
  },
}

export const updateTeam = {
  body: {
    title: Joi.string(),
    description: Joi.string(),
  },
}
export const updateTeamMembers = {
  body: {
    members: Joi.array().items(Joi.string()),
  },
}
