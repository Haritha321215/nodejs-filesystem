const express = require("express");
const fs = require("fs");

const app = express();
const port = 3005;
let filename = "";



// Function to generate current timestamp
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

// Endpoint to read from a file
app.get("/read", (req, res) => {
  console.log(filename);
  fs.readFile(`${filename}`, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }
    res.send(data);
  });
});

// Endpoint to write to a file
app.post("/write", (req, res) => {
  filename = `${getCurrentDateTime()}.txt`;
  const contentToWrite = `This is current timestamp to write to the file: ${getCurrentDateTime()}`;
  fs.writeFile(filename, contentToWrite, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      res.status(500).send("Error writing to file");
      return;
    }
    res.send(`File '${filename}' has been written successfully.`);
  });
});

// Endpoint to append to a file
app.post("/append", (req, res) => {
  filename = `${filename}`;
  const contentToAppend = `\nThis is additional content with current time stamp: ${getCurrentDateTime()}`;
  fs.appendFile(filename, contentToAppend, (err) => {
    if (err) {
      console.error("Error appending to file:", err);
      res.status(500).send("Error appending to file");
      return;
    }
    res.send(`Content has been appended to the file '${filename}'.`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
