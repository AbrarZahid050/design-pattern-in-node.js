const { spawn } = require("node:child_process");
const readLine = require("readline");

// Create an interface for taking input from user.
const r1 = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Spawns a process, -> "java -jar java.jar" will be written
// to the terminal. So "java.jar" ought to be in the
// current working directory.
const javaProcess = spawn("java", ["-jar", "java.jar"]);

// By default, pipes for stdin, stdout, and stderr
// are established between the parent Node.js process
// and the spawned subprocess.

// This will run once when child process has spawned.
javaProcess.on("spawn", () => {
  console.log("----------Connecting to Java Process------------");
});

// Upon receiving input from child process.
javaProcess.stdout.on("data", (data) => {
  console.log(data.toString());

  if (data.toString().trim() !== "-> [Java] bye") {
    r1.question("-> [Node] Enter something: ", (input) => {
      javaProcess.stdin.write(input + "\r\n");
    });
  }
});

// Upon receiving error from the child process.
javaProcess.stderr.on("data", (data) => {
  console.error(`error: ${data}`);
});

// will run when the child process exits.
javaProcess.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
  r1.close();
  javaProcess.stdin.end;
});
