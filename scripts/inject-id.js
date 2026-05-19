const fs = require("fs");
const path = require("path");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const filePath = path.resolve(__dirname, "../dist/module.json");

let moduleJson = fs.readFileSync(filePath, "utf8");

moduleJson = moduleJson.replace(/ID_PLACEHOLDER/g, pkg.name);
moduleJson = moduleJson.replace(/VERSION_TAG/g, pkg.version);

fs.writeFileSync(filePath, moduleJson);
console.log(`Injected id="${pkg.name}" version="${pkg.version}"`);
