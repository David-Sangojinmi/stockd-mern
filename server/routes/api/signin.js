const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = app => {
  // app.get('/api/counters', (req, res, next) => {
  //   Counter.find()
  //     .exec()
  //     .then((counter) => res.json(counter))
  //     .catch((err) => next(err));
  // });
  // app.post('/api/counters', function (req, res, next) {
  //   const counter = new Counter();
  //   counter.save()
  //     .then(() => res.json(counter))
  //     .catch((err) => next(err));
  // });

  /**
   * SIgn up
   */
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: "Error: First name cannot be blank."
      });
    }

    if (!lastName) {
      return res.send({
        success: false,
        message: "Error: Last name cannot be blank."
      });
    }

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email name cannot be blank."
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password name cannot be blank."
      });
    }

    email = email.toLowerCase(); // email should always go in db in lowercase form

    /**
     * Steps:
     * 1. Verify email doesn't exists
     * 2. Save
     */
    User.find(
      {
        email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Account already exists."
          });
        }

        // Save the new user
        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error."
            });
          }

          return res.send({
            success: true,
            message: "Sign up successful."
          });
        });
      }
    );
  });

  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body; // needs to be mutable unlike above

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email name cannot be blank."
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password name cannot be blank."
      });
    }

    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid."
          });
        }

        const user = users[0];

        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error: Invalid password."
          });
        }

        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error."
            });
          }

          return res.send({
            success: true,
            message: "Valid sign in.",
            token: doc._id
          });
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    // Get token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify token is one of a kind and not deleted
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        }

        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid."
          });
        } else {
          return res.send({
            success: true,
            message: "Successful."
          });
        }
      }
    );
  });

  app.get("/api/account/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;
    //?token=test

    // Verify the token is one of a kind and is not deleted
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        }

        return res.send({
          success: true,
          message: "Successful."
        });
      }
    );
  });
};
