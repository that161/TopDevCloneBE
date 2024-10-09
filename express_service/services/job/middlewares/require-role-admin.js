const RequireRoleAdmin = async (req, res, next) => {
  next();
};

module.exports = RequireRoleAdmin;
