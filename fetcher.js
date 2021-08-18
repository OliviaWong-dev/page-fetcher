const fs = require("fs");
const readline = require("readline");

const args = process.argv;
let site = args.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const request = require("request");
request(site[0], (error, response, body) => {
  console.log(response.statusCode);
  fs.exists(site[1], (exist) => {
    if (exist) {
      rl.question(
        "If file alrady exists, type Y to overwite, otherwise skip and exit the app",
        (answer) => {
          if (answer === "Y") {
            fs.writeFile(site[1], body, (err) => {
              if (err) throw err;
              console.log(
                `Downloaded and saved ${body.length}bytes to ${site[1]}`
              );
              process.exit();
            });
          } else {
            process.exit();
          }
        }
      );
    } else {
      fs.writeFile(site[1], body, (err) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${body.length}bytes to ${site[1]}`);
        process.exit();
      });
    }
  });
});
