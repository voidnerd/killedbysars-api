const Victim = require("../models/Victim");
const router = require("../routes");
const Joi = require("joi");

exports.getAll = async (ctx) => {
  const victims = await Victim.find({});

  ctx.body = {
    data: victims,
  };
};

exports.getOne = async (ctx) => {
  try {
    const victim = await Victim.findOne({ _id: ctx.params.id });
    ctx.body = {
      data: victim,
    };
  } catch (error) {
    ctx.response.status = 409;
    ctx.body = {
      message: "Fetch Failed",
    };
  }
};

exports.store = async (ctx) => {
  victimScema = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string().required(),
    state: Joi.string().required(),
    location: Joi.string().required(),
    year_born: Joi.number().integer().required(),
    year_killed: Joi.number().integer().required(),
    story: Joi.string().required(),
  });

  const {error } = victimScema.validate(ctx.request.body);

  if (error) {
    ctx.response.status = 422;
    ctx.body = {
      message: "Invalid request",
      error: error,
    };
  }

  ctx.body = {
    message: "we are here",
  };
};
