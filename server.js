const express = require("express");
const path = require("path");
const pool = require("./db");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/projects", async (req, res) => {

    try {

        const result =
        await pool.query(
            "SELECT * FROM projects ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});