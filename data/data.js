

import dbPromise from "../db/db";

const seed = async () => {
    const db = await dbPromise;
    const blog = [
      {author: "Zsombor Papdi",
       title:"Bike Shop",
       content:"Bought a Bike Shop",
       category:"Life",
       releaseDate:"2027-01-03",
       lastmoddate:"2027-03-14"
      },

    ];
  
    try {
      for (const entry of blog) {
        await db.run(`
          INSERT INTO blogs (author, title, content, category, releaseDate, lastmoddate)
          VALUES (?, ?, ?, ?,?,?)`, 
          [entry.author, entry.title, entry.content, entry.category, entry.releaseDate, entry.lastmoddate]);
      }
      console.log("blog seeded successfully!");
    } catch (err) {
      console.error("Error seeding blog:", err);
    }
  };
  
  seed();
  
