/*const net = require("node:net");
const readLine = require("readline");

// Create an interface for reading input
const r1 = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define the server's port and host
const port = 5555;
const host = "localhost";

// Create a TCP client connection
const client = net.createConnection(port, host, () => {
  console.log("-> [Node] connected to server!");
});

// Event handler for receiving data from the server
client.on("data", (data) => {
  console.log("-> [Java]", data.toString());
  // Prompt user for input
  r1.question("-> [Node] Enter something: ", (input) => {
    // Send user input to the server
    client.write(input + "\r\n");
  });
  client.end;
});

// Event handler for when the connection ends
client.on("end", () => {
  console.log("\n-> [Node] disconnecting from server.");
  // Close the input interface
  r1.close();
});

// Display a starting message
console.log("....Node Starting....");
*/

while (true) {

}
