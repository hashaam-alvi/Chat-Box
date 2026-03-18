const express = require("express");
const router = express.Router();
const db = require("../DB/DB_connection");


router.post("/createChat", async(req, res) => {
    const {chatName} = req.body;
    await db.oneOrNone(`Insert into rooms ( chatName ) Values($1);`,[chatName]);

    res.json({
        success:true,
    });

});

router.get("/getRooms", async(req, res) => {
    const rooms = await db.any("Select * from rooms ;");

    res.json({
        success:true,
        rooms:rooms
    });

});

router.get("/rooms", (req,res) => {
    res.send("Server IS live/rooms.js");
});


module.exports = router;