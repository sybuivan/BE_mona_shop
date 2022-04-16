import pool from "../configs/connectDb.js";

export let getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM users");

  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

export let createNewUser = async (req, res) => {
  let { fullName } = req.body;

  console.log(req.body.fullName);
  
  if (!fullName) {
    return res.status(200).json({
      message: "missing required params 200",
    });
  }

  await pool.execute(
    "insert into users(fullName, email, password, address) values (?, ?, ?, ?)",
    [fullName, email, password, address]
  );

  return res.status(200).json({
    message: "ok",
  });
};
