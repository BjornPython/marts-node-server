// let sql;
const sqlite3 = require("sqlite3").verbose()


// CONNECT TO MARTS DB
const db = new sqlite3.Database("./marts.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})

// INITIALIZE TABLE
// sql = `CREATE TABLE marts(id INTEGER PRIMARY KEY,title TEXT,description TEXT)`
// db.run(sql)


// DROP MARTS DB
// db.run("DROP TABLE marts") WARNING!


// INITIALIZE DATA TO MARTS DB
// sql = `INSERT INTO marts(title,description) VALUES
//     ('Kung Fu', 'A Chinese martial art that emphasizes fluid movements and incorporates strikes, kicks, throws, and joint locks. Kung Fu also includes weapons training and meditation. It has many different styles and is often used in films and popular culture.'),
//     ('Muay Thai', 'A Thai martial art that focuses on striking techniques such as punches, kicks, elbows, and knee strikes. Muay Thai also incorporates clinching and throwing. It is often called the ''art of eight limbs'' due to the many techniques it uses.'),
//     ('Capoeira', 'A Brazilian martial art that combines dance, acrobatics, and music. Capoeira incorporates kicks, sweeps, and headbutts, and is often played as a game rather than a fight. It has a rich history and is often associated with the Afro-Brazilian community.'),
//     ('Krav Maga', 'An Israeli martial art that focuses on practical self-defense techniques. Krav Maga includes strikes, kicks, and grappling, as well as defenses against weapons and multiple attackers. It is often used by military and law enforcement personnel.'),
//     ('Wing Chun', 'A Chinese martial art that emphasizes close-range combat and quick, simultaneous attack and defense. Wing Chun uses simple and efficient techniques and is often practiced with a partner. It is known for its effectiveness in close-quarters fighting.'),
//     ('Boxing', 'A Western martial art that focuses on punches and footwork. Boxing is often practiced as a sport and is known for its effectiveness in hand-to-hand combat. It has a long history and has produced many legendary fighters.'),
//     ('Aikido', 'A Japanese martial art that emphasizes throws and joint locks to redirect an opponent''s energy. Aikido practitioners use fluid and circular movements to defend themselves and neutralize attacks. It is often practiced for self-improvement and spiritual growth.'),
//     ('Karate', 'A Japanese martial art that emphasizes striking techniques such as punches, kicks, and knee strikes. Karate also incorporates joint locks and throws for self-defense. It is often practiced as a sport and has become popular around the world.'),
//     ('Jiu-jitsu', 'A Brazilian martial art that emphasizes ground fighting and submission techniques. Jiu-jitsu practitioners use leverage and technique to overcome opponents, making it effective for self-defense. It has gained popularity in recent years due to its effectiveness in mixed martial arts.'),
//     ('kyokoshin', 'test edit')`

// db.run(sql, (err) => { if (err) console.log(err.message); })


const createMartialArt = async (title, description) => {
    if (!title || !description) { throw new Error("no title or description") }

    const sql = `INSERT INTO marts(title,description) VALUES (?,?)`
    return new Promise((resolve, reject) => {
        db.run(sql, [title, description], (err) => {
            if (err) { reject(err) }
            resolve({ success: true })
        })
    })

}


// QUERY MARTIAL ARTS
const getAllMartialArts = async () => {
    const sql = `SELECT * FROM marts`
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}



// UPDATE
const updateDescription = async (newDesc, id) => {
    if (!newDesc || !id) { throw new Error("No new Description or id") }
    const sql = `UPDATE marts SET description = ? WHERE id = ?`
    db.run(sql, [newDesc, id], (err) => {
        if (err) { return console.error(err.message) }
    })
}


// DELETE
const deleteMartialArt = async (id) => {
    if (!id) { throw new Error("no id") }
    const sql = `DELETE FROM marts WHERE id = ?`
    db.run(sql, [id], (err) => {
        if (err) { return console.error(err.message) }
    })
}




module.exports = { createMartialArt, getAllMartialArts, updateDescription, deleteMartialArt }