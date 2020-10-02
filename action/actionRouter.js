const express = require("express");

const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving actions.",
      });
    });
});

router.post("/", (req, res) => {
  Actions.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding an action.",
      });
    });
});

router.put("/:id", (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Action could not be found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating action.",
      });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "Action has been deleted." });
      } else {
        res.status(404).json({ message: "Action could not be found." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error deleting the action.",
      });
    });
});

// //custom middleware

// //endpoints that inlude id param (ex: /api/users/:id)
// function validateUserId(req, res, next) {
//   Users.getById(req.params.id)
//     .then((data) => {
//       if (!data) {
//         res.satus(404).json({ errorMessage: "Incorrect User Id" });
//       } else {
//         req.user = data;
//       }
//       next();
//     })
//     .catch((data) => res.status(500).json({ error: "Something went wrong." }));
// }

// // validateUser validates the body on a request to create a new user
// // if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
// // if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
// function validateUser(req, res, next) {
//   if (req.body && req.body.name) {
//     next();
//   } else if (!req.body) {
//     res.satus(400).json({ errorMessage: "Missing user data" });
//   } else if (!req.body.name) {
//     res.satus(400).json({ errorMessage: "Missing required ame field" });
//   } else {
//     Users.insert(req.body)
//       .then((data) => {
//         req.body = data;
//         next();
//       })
//       .catch((data) => {
//         res.status(500).json({ error: "Something went wrong." });
//       });
//   }
// }

// // validatePost validates the body on a request to create a new post
// // if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
// // if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
// function validatePost(req, res, next) {
//   if (!req.body) {
//     res.status(400).json({ message: "missing post data" });
//   } else if (!req.body.text) {
//     res.status(400).json({ message: "missing required text field" });
//   } else {
//     Posts.insert({ ...req.body, user_id: req.params.id })
//       .then((data) => {
//         req.post = data;
//         next();
//       })
//       .catch((data) => {
//         console.log(data);
//         res.status(500).json({ error: "Something went wrong." });
//       });
//   }
// }

module.exports = router;
