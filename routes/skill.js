const express = require("express");
const router = express.Router();

// PUBLIC SKILLS API (NO LOGIN)
router.get("/", (req, res) => {
  res.json({
    success: true,
    skills: [
      {
        id: 1,
        title: "Web Development",
        price: 500,
        seller: "John"
      },
      {
        id: 2,
        title: "Graphic Design",
        price: 300,
        seller: "Alex"
      }
    ]
  });
});

module.exports = router;
