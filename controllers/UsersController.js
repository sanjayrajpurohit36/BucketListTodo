const UserRepository = require("../repositories/UserRepository");

module.exports = {
  getUser: function(userData, res) {
    const { email } = userData;
    UserRepository.getUserData(email, req.app.db)
      .then(result => {
        res.send({
          status: true,
          data: result
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          success: false,
          message
        });
      });
  },

  login: function(req, res) {
    const { email, password } = req.body;
    UserRepository.login(email, password, req.app.db)
      .then(result => {
        res.send({
          status: true,
          data: result
        });
      })
      .catch(message => {
        res.status(200);
        res.send({
          status: false,
          message
        });
      });
  },

  logout: function(req, res) {
    const userId = req.user.id;
    UserRepository.logout(userId)
      .then(result => {
        res.send({
          status: true,
          message: "user is logged out"
        });
      })
      .catch(message => {
        res.status(422);
        res.send({
          success: false,
          message
        });
      });
  },

  signup: function(req, res) {
    var data = req.body;
    UserRepository.create(data)
      .then(result => {
        // logging in user after signup
        UserRepository.login(data.email, data.password)
          .then(result => {
            res.send({
              status: true,
              data: result
            });
          })
          .catch(message => {
            res.status(422);
            res.send({
              status: false,
              message: message
            });
          });
      })
      .catch(message => {
        // if err comes that means email already exists.
        res.status(200);
        res.send({
          status: false,
          message: 'Email already exist'
        })
      });
  }
};
