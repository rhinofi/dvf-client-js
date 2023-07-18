const { Joi } = require('@rhino.fi/dvf-utils')

module.exports = Joi.object({
  permitValue: Joi.string(),
  deadline: Joi.number(),
  v: Joi.any(),
  r: Joi.any(),
  s: Joi.any()
})
