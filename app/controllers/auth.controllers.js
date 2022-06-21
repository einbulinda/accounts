const { user } = require("../models");

const db = require("../models"),
  config = require("../config/auth.config"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  User = db.user,
  Role = db.role,
  Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  // Save user to DB
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: { [Op.or]: req.body.roles },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully." });
          });
        });
      } else {
        // User role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully." });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not Found" });
      }
      var validPassword = bcrypt.compareSync(req.body.password, user.password);

      if (!validPassword) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid Password" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 /*24Hrs*/,
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
