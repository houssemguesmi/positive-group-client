module.exports = {
  findAll: (model) => {
    return model.find({});
  },

  save: (data, model) => {
    return model.create(data);
  },

  delete: (id, model) => {
    return model.deleteOne({ _id: id });
  },

  updateOne: (id, updatedData, model) => {
    return model.updateOne({ _id: id }, updatedData, model);
  },

  findOneById: (id, model) => {
    return model.findById(id);
  },

  findOne: (filter, model) => {
    return model.findOne(filter);
  },

  find: (filter, model) => {
    return model.find(filter);
  },

  findOneAndUpdate: (filter, payload, model) => {
    return model.findOneAndUpdate(filter, payload, { useFindAndModify: false });
  },
};
