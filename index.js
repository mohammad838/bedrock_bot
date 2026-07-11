const express = require("express");
const bedrock = require("bedrock-protocol");

const app = express();

const PORT = process.env.PORT || 3000;

//  زنا ممعلومات السيرفر
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
        offline: false,
        skipPing: true,
        connectTimeout: 60000
    });

    client.on("join", () => {
        console.log("✅ Bot joined!");
    });

    client.on("disconnect", (packet) => {
        console.log("❌ Disconnected:", JSON.stringify(packet, null, 2));

        setTimeout(() => {
            connect();
        }, 10000);
    });

    client.on("error", (err) => {
        console.error("Bot error:", err);
    });
}
connect();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

app.listen(PORT, () => {
    console.log(`Web server started on port ${PORT}`);
});
