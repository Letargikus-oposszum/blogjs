import dbPromise from "../db/db.js";

export const getblog = async (req, res) => {
  const db = await dbPromise;
  const rows = await db.all("SELECT * FROM blogs");

  const result = rows.map(row => ({
    id: row.id,
    author: row.band,
    title: row.title,
    category: row.category,
    content: row.authors,
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
    author: row.band,
    title: row.title,
    category: row.category,
    content: row.authors,
    releaseDate: row.releaseDate,
    lastmoddate: row.lastmoddate
  });
};

export const createblog = async (req, res) => {
  const db = await dbPromise;
  const { author, title, content, category, releaseDate, lastmoddate } = req.body;

  const authorsArray = await db.run("SELECT authors FROM blogs");

  authorsArray.array.forEach(author => {
      if (author = authors){
        alert("There can be no blogs with the same name!");
        //abortolni kellene ezt a függvényt ez után
      }
  });

  if (!author, !title, !content, !category, !releaseDate, !lastmoddate) {
    return res.status(400).json({ message: "Invalid input something" });
  }

  const result = await db.run(
    "INSERT INTO blogs (author, title, content, category, releaseDate, lastmoddate) VALUES (?, ?, ?, ?,?,?)",
    [band, title, authors, releaseDate] 
  );

  res.status(201).json({
    id: result.lastID,
    author,
    title,
    category,
    content,
    releaseDate,
    lastmoddate
  });
};


export const updateblog = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  // Use the database ID from the route params
  const { author, title, content,category, releaseDate , lastmoddate} = req.body; // Add missing fields

  // Validate input
  if (!author, !title, !content, !category, !releaseDate, !lastmoddate) {
    return res.status(400).json({ message: "Invalid input something" });
  }

  // Check if the blog with the provided ID exists in the database
  const check = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "blog not found" });
  }

  // Update the blog in the database
  await db.run(
    "UPDATE blogs SET author = ?, title = ?, content = ?, category = ?, releaseDate = ?, lastmoddate = ? WHERE id = ?",
    [band,title,authors,releaseDate, id]
  );

  // Return the updated blog data in the response
  res.status(201).json({
    id: check.lastID,
    author,
    title,
    category,
    content,
    releaseDate,
    lastmoddate
  });
};


export const deleteblog = async (req, res) => {
  const db = await dbPromise;
  const id = parseInt(req.params.id);  // Use the database ID from the route params

  // Check if the blog with the provided ID exists in the database
  const check = await db.get("SELECT * FROM blogs WHERE id = ?", [id]);
  if (!check) {
    return res.status(404).json({ message: "blog not found" });
  }

  // Delete the blog from the database
  await db.run("DELETE FROM blogs WHERE id = ?", [id]);

  // Respond with a success message
  res.status(200).json({ message: "Delete successful" });
};

