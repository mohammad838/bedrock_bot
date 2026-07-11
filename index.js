const express = require("express");
const bedrock = require("bedrock-protocol");

const app = express();

const PORT = process.env.PORT || 3000;

//  0زنا ممعلومات السيرفر
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
        followPort: false,
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
    client.on("status", status => {
    console.log("Status:", status);
});

client.on("session", () => {
    console.log("✅ Session established");
});

client.on("join", () => {
    console.log("✅ Bot joined!");
});

client.on("spawn", () => {
    console.log("✅ Bot spawned!");
});

client.on("kick", reason => {
    console.log("❌ Kicked:", reason);
});

client.on("close", () => {
    console.log("❌ Connection closed");
});
}
connect();

app.get("/", (req, res) => {
    res.send("Bot is running");
});

app.listen(PORT, () => {
    console.log(`Web server started on port ${PORT}`);
});
