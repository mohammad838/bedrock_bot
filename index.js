const express = require("express");
const bedrock = require("bedrock-protocol");

const app = express();

const PORT = process.env.PORT || 3000;

// 2ممعلومات السيرفر
const HOST = process.env.MC_HOST;
const MC_PORT = Number(process.env.MC_PORT || 19132);
const USERNAME = process.env.BOT_NAME || "BedrockBot";

let client;

function connect() {
    console.log("Connecting...");

    client = bedrock.createClient({
    host: HOST,
    port: MC_PORT,
    username: USERNAME,
    offline: false
});

    client.on("join", () => {
        console.log("✅ Bot joined!");
    });

    client.on("disconnect", () => {
        console.log("❌ Disconnected");

        setTimeout(() => {
            connect();
        }, 5000);
    });

    client.on("error", (err) => {
        console.log(err.message);
    });
}
connect();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

app.listen(PORT, () => {
    console.log(`Web server started on port ${PORT}`);
});
