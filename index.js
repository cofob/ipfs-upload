const express = require("express");
const upload = require("express-fileupload");
const { File, Web3Storage } = require('web3.storage');
const CIDTool = require('cid-tool');

const web3 = new Web3Storage({ token: "web3.storage token" });
const app = express();

app.use(upload());

app.post("/YOURSECRETHERE", async (req, res) => {
    const name = req.files.file.name;
    const contents = req.files.file.data;
    const file = new File([contents], name);
    let cid = await web3.put([file]);
    cid = CIDTool.format(cid, { base: "u", cidVersion: 1 });
    res.send("{\"cid\":\""+cid+"\"}");
});

console.log("started");
app.listen(3000);
