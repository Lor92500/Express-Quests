const database = require("../../databases");


const getUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  const sqlValues = [];

  if (req.query.language) {
    sql += " WHERE language = ?";
    sqlValues.push(req.query.language);

    if (req.query.city) {
      sql += " AND city = ?";
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city) {
    sql += " WHERE city = ?";
    sqlValues.push(req.query.city);
  }

    database
      .query("SELECT * FROM users")
      .then(([users]) => {
        res.status(200).json({
          status:200,
          message:"Users retrieved successfully",
        });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  
  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("SELECT * FROM users WHERE id = ?", [id])
      .then(([users]) => {
        if (users.length > 0) {
          res.json(users[0]);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  
  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.status(201).send({ id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }

  const putUser = (req,res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;

    database 
    .query(
      "UPDATE users SET firstname = ?,lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id] 
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  };

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    
    database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  };

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
