const fs = require("fs");

const annotation = "@insertGeneratedHtml";

if(process.argv.length < 4) {
    throw new Error("Invalid number of arguments. Syntax: node buildHtml [input] [output]");
}

const baseReadStream = fs.createReadStream(process.argv[2], "utf-8");
const outputWriteStream = fs.createWriteStream(process.argv[3], "utf-8");
baseReadStream.on("data", (chunk) => {
    if(chunk.match(new RegExp(annotation))) {
        const segements = chunk.split(annotation);
        outputWriteStream.write(segements[0]);
        const generatedHtml = generateHtml();
        outputWriteStream.write(generatedHtml);
        outputWriteStream.write(segements[1]);
    } else {
        outputWriteStream.write(chunk);
    }
});

function generateHtml() {
    var result = "";
    const configString = fs.readFileSync("htmlConfig.json", "utf-8");
    const config = JSON.parse(configString);
    config.categories.forEach((category) => {
        result += `<h2 class="reposList_header">${category.title}</h2><ul>`;
        category.repos.forEach((repo) => {
            if(!repo.disabled) {
                result += `<li><a class="reposList_repo" href="${repo.url}">${repo.name}</a></li>`;
            }
        });
        result += "</ul>";
    });
    return result;
}