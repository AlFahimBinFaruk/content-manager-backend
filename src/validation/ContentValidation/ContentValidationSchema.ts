import Joi from "joi";

export const ContentValidationSchema = Joi.object({
  title: Joi.string().required(),
  contentURL: Joi.string().required(),
  desc: Joi.string().required(),
});
