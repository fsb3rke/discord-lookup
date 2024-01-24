const express = require("express");
const vite = require("vite-express");
const { Client, IntentsBitField } = require("discord.js")
require("dotenv").config()


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
    ],
})

const convert_discord_format_to_link = (userID, specialID) => {
    return `https://cdn.discordapp.com/banners/${userID}/${specialID}.png?size=1024`
}

class Server {
    #port
    #app

    constructor(port) {
        this.#port = port
        this.#app = express();
    }

    #init = () => {
        this.#app.get("/", (req, res) => {
            console.log("Welcome");
            res.sendStatus(200, "OK_/");
        })
    }

    #handle_discord = async (userID) => {
        let user_stats = {
            username: "",
            globalName: "",
            avatarLink: "",
            bannerLink: "",
            accentColor: 0,
            isBot: false,
        }
        let member = await client.users.fetch(String(userID))
        user_stats.username = member.username;
        user_stats.globalName = member.globalName;
        user_stats.avatarLink = convert_discord_format_to_link(userID, member.avatar);
        user_stats.bannerLink = convert_discord_format_to_link(userID, member.banner);
        user_stats.accentColor = member.accentColor;
        user_stats.isBot = member.bot;


        return user_stats;
    }

    #api = () => {
        this.#app.get("/api/dclookup", async(req, res) => {
            const userID = req.query.id;
            console.log(userID);
            let stat_data = await this.#handle_discord(userID);
            res.status(200).json(stat_data);
        })
    }

    #listen = () => {
        vite.listen(this.#app, this.#port, () => {
            console.log(`Server is listening on port ${this.#port}\nYou can click this(http://localhost:${this.#port} to redirect the link)`);
        })
    }

    run = () => {
        this.#init();
        this.#api();
        this.#listen();
    }
}


client.on("ready", () => {
    const sw = new Server(2117);
    sw.run();
})

client.login(process.env.DISCORD_BOT_TOKEN);