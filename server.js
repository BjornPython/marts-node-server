const http = require("http")
const PORT = process.env.PORT || 3000

const martialArtsTxt = `This is a list of popular martial 
arts from around the world. 
- Karate is a Japanese martial art that uses striking techniques such as punches,
 kicks, and knee strikes, as well as joint locks and throws for self-defense. Taekwondo is a Korean martial 
 art that focuses on high, fast, and spinning kicks, and also includes punches, blocks, and joint locks. Jiu-jitsu is a 
 Brazilian martial art that emphasizes ground fighting and submission techniques, using leverage and technique to 
 overcome opponents. Kung Fu is a Chinese martial art that emphasizes fluid movements and incorporates strikes, kicks, 
 throws, and joint locks, as well as weapons training and meditation. Muay Thai is a Thai martial art that focuses on 
 striking techniques, such as punches, kicks, elbows, and knee strikes, as well as clinching and throwing. Capoeira is a 
 Brazilian martial art that combines dance, acrobatics, and music, and is often played as a game. Krav Maga is an Israeli 
 martial art that focuses on practical self-defense techniques, including strikes, kicks, and grappling, as well as defenses 
 against weapons and multiple attackers. Wing Chun is a Chinese martial art that emphasizes close-range combat and quick, simultaneous 
 attack and defense, while boxing is a Western martial art that focuses on punches and footwork, often practiced as a sport. 
 Finally, Aikido is a Japanese martial art that emphasizes throws and joint locks to redirect an opponents energy, 
 often practiced for self-improvement and spiritual growth.`


const server = http.createServer((req, res) => {
    if (req.url === "/martial-arts") {
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(`<p>${martialArtsTxt}</p>`)
    } else {
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(`<p>Hello World</p>`)
    }
})


server.listen(PORT, () => {console.log(`SERVER RUNNING ON PORT: ${PORT}...`);})