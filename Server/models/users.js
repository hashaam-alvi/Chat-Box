const express = require("express");
const router = express.Router();
const db = require("../DB/DB_connection");

router.post("/login", async(req, res) => {
    const {username , password} = req.body;
    const user = await db.oneOrNone("Select id,username,password from users Where username = $1",[username]);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    res.json({
        success:true,
        user: {username: user.username , id:user.id},
    });
});


router.post("/signup", async(req, res) => {
    const {username , password} = req.body;
    const user = await db.oneOrNone("Insert into users (username,password) Values($1,$2)  RETURNING username",[username , password]);

    res.json({
        success:true,
        user: {username: user.username},
    });

});

router.get("/users", (req,res) => {
    res.send("Server IS live/users.js");
});


module.exports = router;