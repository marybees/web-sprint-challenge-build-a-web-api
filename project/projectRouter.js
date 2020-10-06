const express = require("express");

const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      if (projects.length === 0) {
        res
          .status(404)
          .json({ message: "There were no projects to be found." });
      } else {
        res.status(200).json(projects);
      }
    })
    .catch((projects) => {
      res.status(500).json({
        message: "Error retrieving projects.",
      });
    });
});

// router.post("/", (req, res) => {
//   Projects.insert(req.body)
//     .then((user) => {
//       res.status(201).json(user);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error adding a project.",
//       });
//     });
// });

// router.put("/:id", (req, res) => {
//   Projects.update(req.params.id, req.body)
//     .then((user) => {
//       if (user) {
//         res.status(200).json(user);
//       } else {
//         res.status(404).json({ message: "Project could not be found." });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error updating project.",
//       });
//     });
// });

// router.delete("/:id", (req, res) => {
//   Projects.remove(req.params.id)
//     .then((user) => {
//       if (user) {
//         res.status(200).json({ message: "Project has been deleted." });
//       } else {
//         res.status(404).json({ message: "Project could not be found." });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error deleting the project.",
//       });
//     });
// });

// //custom middleware

// function validateUserId(req, res, next) {
//   Projects.getById(req.params.id)
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
//     Projects.insert(req.body)
//       .then((data) => {
//         req.body = data;
//         next();
//       })
//       .catch((data) => {
//         res.status(500).json({ error: "Something went wrong." });
//       });
//   }
// }

// function validateProject(req, res, next) {
//   if (!req.body) {
//     res.status(400).json({ message: "Missing project data." });
//   } else if (!req.body.text) {
//     res.status(400).json({ message: "Missing required text field." });
//   } else {
//     Projects.insert({ ...req.body, user_id: req.params.id })
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
