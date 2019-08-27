const fs = require('fs');
const VideoCache = require("./videoCache");

const folder = "./assets/";
const cache = new VideoCache(folder);

exports.getAllVideosTXT = () => {
    return new Promise(async (resolve) => resolve(toStringItems(await this.getAllVideos())));
}

exports.getVideosTXT = (items) => {
    return toStringItems(items);
}

function toStringItems(items) {
    return items.map(item => "\n" + item.name + (item.alias ? ` *(${item.alias})*` : ""));
}

exports.getVideos = (filter) => {
    return new Promise(async (resolve) => {
        resolve(cache.get(filter));
    });
}

exports.getAllVideos = () => {
    return new Promise(async (resolve) => {
        resolve(cache.videos);
    });
}

function walk(dir) {
    let results = [];
    let list = fs.readdirSync(dir);

    list.forEach(function (file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory())
            results = results.concat(walk(file));
        else
            results.push(file);
    });

    return results;
}