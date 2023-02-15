import { ChatGPTAPIBrowser } from "chatgpt"
const express = require('express');
const app = express()
const PORT = 7777;

app.listen(
    PORT,
    () => console.log("Its alive on http://localhost:" + PORT + "")
)

const api = new ChatGPTAPIBrowser({
    email: "johann.williams@gmx.de",
    password: ""
})
await api.initSession()

process.on('uncaughtException', err => {
    console.error(err && err.stack)
});

async function ai(q) {
    const result = await api.sendMessage(q)
    console.log(result)
    console.log(result.response)
    return result.response;
}

app.get("/gpt/:question", (req, res) => {
    var { question } = req.params;
    var result = ai (question)
  
    res.status(200).json({
        message: result
    })
})

