const express = require("express");

const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      if (actions.length === 0) {
        res.status(404).json({ message: "There were no actions to be found." });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch((actions) => {
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

// function validateUserId(req, res, next) {
//   Actions.getById(req.params.id)
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

// function validateUser(req, res, next) {
//   if (req.body && req.body.name) {
//     next();
//   } else if (!req.body) {
//     res.satus(400).json({ errorMessage: "Missing user data" });
//   } else if (!req.body.name) {
//     res.satus(400).json({ errorMessage: "Missing required ame field" });
//   } else {
//     Actions.insert(req.body)
//       .then((data) => {
//         req.body = data;
//         next();
//       })
//       .catch((data) => {
//         res.status(500).json({ error: "Something went wrong." });
//       });
//   }
// }

// function validateAction(req, res, next) {
//   if (!req.body) {
//     res.status(400).json({ message: "Missing action data." });
//   } else if (!req.body.text) {
//     res.status(400).json({ message: "Missing required text field." });
//   } else {
//     Actions.insert({ ...req.body, user_id: req.params.id })
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
