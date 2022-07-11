const { authJwt } = require("../middleware"),
  controller = require("../controllers/profile.controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/profile/create",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.createProfile
  );

  app.get(
    "/api/profile/all-profiles",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.getAllProfiles
  );

  app.patch(
    "/api/profile/update",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.updateProfile
  );
};
