const database = require("../../databases");


const getUsers = (req, res) => {
    database
      .query("SELECT * FROM users")
      .then(([users]) => {
        res.json(users);
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
  
  const postUser = async (req, res) => {
      const { firstname, lastname, email, city, language } = req.body;
  
      if (!firstname || !lastname || !email) {
          return res.status(400).json({ message: "Firstname, lastname, and email are required." });
      }
  
      try {
        const [result] = await database.query(
          "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
          [firstname, lastname, email, city, language]
        );
        res.status(201).json({ id: result.insertId });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
  };
  

module.exports = {
  getUsers,
  getUserById,
  postUser,
};
