const JobModel = require('../../models/job');

const UpdateApplyCountGrpc = async (call, callback) => {
  try {
    const id = call.request.id;
    let data = await JobModel.findByPk(id);
    data.appliedCount++;
    await data.save();
    callback(null, data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { UpdateApplyCountGrpc };
