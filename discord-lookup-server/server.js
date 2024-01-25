const express = require("express");
const vite = require("vite-express");
const { Client, IntentsBitField } = require("discord.js")
const cors = require("cors");
require("dotenv").config()


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
    ],
})

const scale_image_size = (url, size) => {
    let stackURL = "";

    if (url.endsWith(".webp")) {
        stackURL = url.replace(".webp", `.png?size=${String(size)}`);
    } else if (url.endsWith(".gif")) {
        stackURL = url.replace(".gif", `.gif?size=${String(size)}`);
    } else {
        console.log("ERR | (scale_image_size(url, size)) => unsupported file type. ("+url+")");
    }

    return stackURL;
}

let glob_user_stats_template = {
    username: "",
    globalName: "",
    avatarURL: "",
    avatarDecorationURL: "",
    bannerURL: "",
    hexAccentColor: "",
    createdAt: "",
    isBot: false,
}

class Server {
    #port
    #app

    constructor(port) {
        this.#port = port
        this.#app = express();
    }

    #init = () => {
        this.#app.use(cors())
        this.#app.get("/", (req, res) => {
            console.log("Welcome");
            res.sendStatus(200, "OK_/");
        })
    }

    #handle_discord = async (userID) => {
        let user_stats = glob_user_stats_template;
        let member = await client.users.fetch(String(userID))

        console.log(member);
        console.log(member.createdAt);

        user_stats.username = member.username;
        user_stats.globalName = member.globalName;
        user_stats.avatarURL = scale_image_size(member.avatarURL(), 1024);
        user_stats.avatarDecorationURL = member.avatarDecorationURL(); // TODO: FIX(it returns 'null')
        user_stats.bannerURL = scale_image_size(member.bannerURL(), 1024);
        user_stats.hexAccentColor = member.hexAccentColor;
        user_stats.createdAt = String(member.createdAt);
        user_stats.isBot = member.bot;


        return user_stats;
    }

    #api = () => {
        this.#app.get("/api/dclookup", async(req, res) => {
            let userID = req.query.id;
            let stat_data = glob_user_stats_template;
            stat_data.username = "invalid_body";
            stat_data.globalName = "invalid_body";
            stat_data.avatarURL = "invalid_body";
            stat_data.avatarDecorationURL = "invalid_body";
            stat_data.bannerURL = "invalid_body";
            stat_data.hexAccentColor = "invalid_body";
            stat_data.createdAt = "invalid_body";
            stat_data.isBot = true;

            if (userID === undefined) {
                console.log("ERR | (req.query.id) query not found. (NULL_QUERY, NULL_QUERY_PARAMETER)");
                res.status(404).json(stat_data);
                return;
            }
            console.log(userID);
            
            try {
                stat_data = await this.#handle_discord(userID);
            } catch (err) {
                console.log("ERR | (async #handle_discord(userID)) => invalid body. (USER_NOT_FOUND)");
                res.status(404).json(stat_data);
                return;
            }
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