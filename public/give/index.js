const fs = require("fs");
fs.writeFileSync("./output.json", JSON.stringify(fs.readdirSync("./item").filter(_ => _.endsWith(".png")).map(_ => ({ id: _, name: _.replace(/_/g, " ") }))));