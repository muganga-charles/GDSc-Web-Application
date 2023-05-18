const express = require("express");

const router = express.Router();
const Email = require("../Utilities/email");

// Send confirmation email route


router.post("/confirm-email", async (req, res) => {
  try {
    const body = req.body;
    console.log("body");
    console.log(body);

    if (!body.email || !body.lastName) {
      return res
        .status(400)
        .json({ message: "Please provide email and lastName" });
    }
    if (!body.email.includes("@")) {
      return res
        .status(400)
        .json({ message: "Please provide email valid email" });
    }
    // sending email
    await new Email(body.email).sendConfirmEmail(body.lastName);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.log("error", err.message);
    if (err) {
      return res
        .status(500)
        .json({ message: "Sorry something went wrong while sending email" });
    }
  }
});

// wake the server from  the sleep mode
router.post("/wake-up-server", async (req, res) => {
  try {
    const body = req.body;
    console.log("body");
    console.log(body);

    res.status(200).json({ message: "server is now ready to send email" });
  } catch (err) {
    console.log("error", err.message);
    if (err) {
      return res.status(500).json({ message: "server an error" });
    }
  }
});

module.exports = router;