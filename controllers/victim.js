const Victim = require("../models/Victim");
const router = require("../routes");
const Joi = require("joi");
const Storage = require("../services/storage");

exports.getAll = async (ctx) => {
  let query = {};
  let gender = ctx.request.query.gender;
  if (gender) {
    query = { gender };
  }
  const victims = await Victim.find(query);

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
    year_born: Joi.number().integer().required(),
    year_killed: Joi.number().integer().required(),
    story: Joi.string().required(),
  });

  const { error } = victimScema.validate(ctx.request.body);

  //   console.log(result.error.message);

  if (error) {
    ctx.response.status = 422;
    ctx.body = {
      message: "Invalid request",
      error: error.message,
    };

    return;
  }

  try {
    const file = ctx.request.files.image;
    const victim = new Victim();
    victim.name = ctx.request.body.name;
    victim.gender = ctx.request.body.gender;
    victim.state = ctx.request.body.state;
    victim.year_born = ctx.request.body.year_born;
    victim.year_killed = ctx.request.body.year_killed;
    victim.story = ctx.request.body.story;
    if (file) {
      victim.image = await Storage.upload(file.path);
    }

    await victim.save();
    ctx.body = {
      data: victim,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 409;
    ctx.body = {
      message: "Operation Failed",
      error: error,
    };
  }
};

exports.search = async (ctx) => {
  let query = {};
  let search = ctx.request.query.search;
  console.log(search);
  if (!search) {
    ctx.response.status = 422;
    ctx.body = {
      message: "search query missing",
    };
    return;
  }
  query = { name: new RegExp(search, "i") };
  const victims = await Victim.find(query);
  ctx.body = {
    data: victims,
  };
};
