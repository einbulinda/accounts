const db = require("../models"),
  ROLES = db.ROLES,
  User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "User with that email already exists.",
      });
      return;
    }
    next();
  });
};

checkRolesExists = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! That role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExists: checkRolesExists,
};

module.exports = verifySignUp;
