import dbPromise from "../db/db.js";

export const getblog = async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM blogs");

  const result = rows.map(row => ({
    id: row.id,
    author: row.author,
    title: row.title,
    content: row.content,
    category: row.category,
    releaseDate: row.releaseDate,
    lastmoddate: row.lastmoddate
  }));

  res.status(200).json(result);
};

export const getblogById = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);
  const row = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);

  if (!row) return res.status(404).json({ message: "blog not found" });

  res.status(200).json({
    id: row.id,
    author: row.author,
    title: row.title,
    content: row.content,
    category: row.category,
    releaseDate: row.releaseDate,
    lastmoddate: row.lastmoddate
  });
};

export const createblog = async (req, res) => {
  const db = await dbPromise;
  const { author, title, content, category, releaseDate, lastmoddate } = req.body;

  if (!author, !title, !content, !category, !releaseDate, !lastmoddate) {
    return res.status(400).json({ message: "Invalid input something" });
  }

  const result = await db.run(
    "INSERT INTO blogs (author, title, content, category, releaseDate, lastmoddate) VALUES (?, ?, ?, ?,?,?)",
    [author, title, content,category, releaseDate , lastmoddate] 
  );

  res.status(201).json({
    id: result.lastID,
    author,
    title,
    content,
    category,
    releaseDate,
    lastmoddate
  });
};


export const updateblog = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  
  const { author, title, content,category, releaseDate , lastmoddate} = req.body;

  if (!author, !title, !content, !category, !releaseDate, !lastmoddate) {
    return res.status(400).json({ message: "Invalid input something" });
  }

  const check = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "blog not found" });
  }

  await db.run(
    "UPDATE blogs SET author = ?, title = ?, content = ?, category = ?, releaseDate = ?, lastmoddate = ? WHERE id = ?",
    [author, title, content, category, releaseDate, lastmoddate, id]
  );

  res.status(201).json({
    id: check.lastID,
    author,
    title,
    content,
    category,
    releaseDate,
    lastmoddate
  });
};


export const deleteblog = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  

  const check = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "blog not found" });
  }

  await db.run("DELETE FROM blogs WHERE id = ?", [id]);

  res.status(200).json({ message: "Delete successful" });
};

