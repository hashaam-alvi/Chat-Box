const express = require("express");
const router = express.Router();
const db = require("../DB/DB_connection");

router.post("/login", async(req, res) => {
    const {username , password} = req.body;
    const user = await db.oneOrNone("Select username,password from users Where username = $1",[username]);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    res.json({
        success:true,
        user: {username: user.username},
    });
});

router.get("/", (req,res) => {
    res.send("data");
});


module.exports = router;