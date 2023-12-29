const { createConnection } = require("mysql2/promise");

require("dotenv").config();

// Función para conectar a la base de datos
const connectDB = async () => {
  // Variable para almacenar la conexión
  let connection = null;

  if (!connection)
    connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT),
    });
  return connection;
};

const verifyUser = async (req, res) => {
  const { user, password } = req.body;
  const db = await connectDB();

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [user, password]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "Welcome " + rows[0].username });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    db.end();
  }
};

module.exports = verifyUser;
