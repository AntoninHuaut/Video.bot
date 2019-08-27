const fs = require('fs');
const VideoCache = require("./videoCache");

const folder = "./assets/";
const cache = new VideoCache(folder);

function getAllVideosTXT() {
    return toStringItems(getAllVideos());
}
function getVideosTXT(items) {
    return toStringItems(items);
}
function getVideos(filter) {
    return cache.get(filter);
}
function getAllVideos() {
    return cache.get();
}

exports.getAllVideosTXT = getAllVideosTXT;
exports.getVideosTXT = getVideosTXT;
exports.getVideos = getVideos;
exports.getAllVideos = getAllVideos;

function toStringItems(items) {
    return items.map(item => "\n" + item.name + (item.alias ? ` *(${item.alias})*` : ""));
}
