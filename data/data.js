

import dbPromise from "../db/db";

// zenekar, album címe és legyen még plusz két adat 
const seed = async () => {
    const db = await dbPromise;
    const blog = [
      {author: "Zsombor Papdi",
       title:"Bike Shop",
       category:"Life",
       content:"Bought a Bike Shop",
       date:"2027-01-03",
       lastmoddate:"2027-03-14"
      },

    ];
  
    try {
      for (const entry of blog) {
        await db.run(`
          INSERT INTO blog (band, title, authors, releaseDate)
          VALUES (?, ?, ?, ?)`, 
          [entry.band, entry.title, entry.authors, entry.releaseDate]);
      }
      console.log("blog seeded successfully!");
    } catch (err) {
      console.error("Error seeding blog:", err);
    }
  };
  
  seed();
  
