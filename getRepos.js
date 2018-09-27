const https = require("https");
const fs = require("fs");

if(process.argv.length < 3) {
    throw new Error("Invalid number of arguments. Syntax: node getRepos [username]");
}

const userAgent = "Get Repos App";
const username = process.argv[2];
const configWriteStream = fs.createWriteStream("htmlConfig.json", "utf-8");

https.get({
    hostname: "api.github.com",
    path: `/users/${username}/repos`,
    headers: {
        "User-Agent": userAgent
    }
}, (res) => {
    let data = "";
    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        const repos = JSON.parse(data);
        const otherProjects = {
            "title": "Other",
            "repos": []
        };
        let githubPagesRepo;
        repos.forEach((repo) => {
            if(repo.name.match(/\.github\.io/)) {
                githubPagesRepo = repo.name;
            } else {
                otherProjects.repos.push({
                    "name": repo.name,
                    "url": repo.html_url,
                    "disabled": false
                });
            }
        });
        const outputJson = {
            "categories": [
                otherProjects
            ]
        };
        if(githubPagesRepo) {
            getRepoDirectories(githubPagesRepo, (subdirs) => {
                const staticProjects = {
                    "title": "Static JavaScript",
                    "repos": []
                };
                subdirs.forEach((dir) => {
                    staticProjects.repos.push({
                        "name": dir.name,
                        "url": dir.html_url,
                        "disabled": false
                    });
                });
                outputJson.categories.push(staticProjects);
                writeToOutput(outputJson);
            });
        } else {
            writeToOutput(outputJson);
        }
    });
});

function getRepoDirectories(repo, callback) {
    console.log(`/repos/${username}/${repo}/contents`);
    https.get({
        hostname: "api.github.com",
        path: `/repos/${username}/${repo}/contents`,
        headers: {
            "User-Agent": userAgent
        }
    }, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            let jsonData = JSON.parse(data);
            let repoDirs = [];
            jsonData.forEach((file) => {
                if(file.type === "dir") {
                    repoDirs.push(file);
                }
            });
            callback(repoDirs);
        });
    });
}

function writeToOutput(outputJson) {
    // TODO: don't completely write over htmlConfig. Parse output file, add to it, write stringified version to output
    configWriteStream.write(JSON.stringify(outputJson, null, 1));
}

// TODO: store Last-Modified in file and use If-Modified-Since header? Would have to also track username in file

// TODO: parse names into more human readable ones? (capitalize first character, camel case -> space separated, underscore -> space, etc.)