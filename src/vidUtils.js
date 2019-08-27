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
        let items = await this.getAllVideos();
        items = items.filter(item => {
            let okName = filter == item.name || item.name.includes(filter);
            let okAlias = item.alias && (
                filter == (item.alias + "_" + item.name) || (item.alias + "_" + item.name).includes(filter)
            );

            return okName || okAlias;
        });

        resolve(items);
    });
}

exports.getAllVideos = () => {
    return new Promise(async (resolve) => {
        let items = walk(folder).map(item => {
            let name = item.split('/');
            let alias = name[name.length - 2] || undefined;
            name = name[name.length - 1].split('.');
            let extension = name[name.length - 1];
            name = name[name.length - 2];
            return {
                folder: item,
                name: name,
                alias: alias,
                extension: extension
            }
        });
        items = items.sort((i1, i2) => i1.name > i2.name);
        resolve(items);
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