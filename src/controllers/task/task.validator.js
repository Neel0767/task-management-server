import Joi from 'joi'

export const addTask = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    projectId: Joi.string(),
  },
}

export const updateTask = {
  body: {
    title: Joi.string(),
    description: Joi.string(),
    projectId: Joi.string().allow(['']),
    status: Joi.string().valid('pending', 'completed', 'overdue'),
    userId: Joi.string().allow(['']),
  },
}
