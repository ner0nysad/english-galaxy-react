const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "english-galaxy",
});

app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO users (`surname`, `name`, `email`, `password`) VALUES (?)";
  const values = [
    req.body.surname,
    req.body.name,
    req.body.email,
    req.body.password,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/current-user", (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ?";
  db.query(sql, [req.query.email], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data[0]);
  });
});

app.post("/new", (req, res) => {
  const sql = "INSERT INTO wordsFavorite (`userId`) VALUES (?);";
  db.query(sql, [req.body.userId], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.get("/words", (req, res) => {
  const sql = "SELECT * FROM words";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/words-category", (req, res) => {
  const sql = "SELECT * FROM words WHERE `category` = ?";
  db.query(sql, [req.query.category], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/words-favorite", (req, res) => {
  const sql = "SELECT words FROM wordsFavorite WHERE `userId` = ?";
  db.query(sql, [req.query.userId], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.get("/get-favorite-words", (req, res) => {
  const sql = "SELECT * FROM words WHERE `word` = ?";
  db.query(sql, [req.query.word], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.put("/update-favorite-word", (req, res) => {
  const sql = "UPDATE wordsFavorite SET `words` = ? WHERE `userId` = ?";
  db.query(sql, [req.body.words, req.body.userId], (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json("Success");
    }
  });
});

app.put("/updatevibration", (req, res) => {
  const sql = "UPDATE users SET `vibr` = ? WHERE `id` = ?";
  db.query(sql, [req.body.vibr, req.body.id], (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json("Success");
    }
  });
});

app.put("/updaterating", (req, res) => {
  const sql = "UPDATE users SET `rating` = ? WHERE `id` = ?";
  db.query(sql, [req.body.rating, req.body.id], (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json("Success");
    }
  });
});

app.delete("/delete-account", (req, res) => {
  const sql = "DELETE FROM users WHERE `id` = ?";
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json("Success");
    }
  });
});
app.delete("/delete-account-favorite", (req, res) => {
  const sql = "DELETE FROM wordsFavorite WHERE `userId` = ?";
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json("Success");
    }
  });
});

app.put("/update-password", (req, res) => {
  const sql = "UPDATE users SET `password` = ? WHERE `id` = ?";
  db.query(sql, [req.body.password, req.body.id], (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json("Success");
    }
  });
});

app.put("/update-user-info", (req, res) => {
  const sql =
    "UPDATE users SET `name` = ?, `surname` = ?, `email` = ? WHERE `id` = ?";
  db.query(
    sql,
    [req.body.name, req.body.surname, req.body.email, req.body.id],
    (err, data) => {
      if (err) {
        return res.json("Error");
      } else {
        return res.json("Success");
      }
    }
  );
});

app.put("/update-user-image", (req, res) => {
  const sql = "UPDATE users SET `image` = ? WHERE `id` = ?";
  db.query(sql, [req.body.image, req.body.id], (err, data) => {
    if (err) {
      return res.json("Error");
    } else {
      return res.json("Success");
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../frontend/src/images/avatars");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {});

app.listen(8081, () => {
  console.log("listening");
});
