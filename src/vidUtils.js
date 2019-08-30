const VideoCache = require("./videoCache");

const folder = "./assets/";
const cache = new VideoCache(folder);

exports.refreshCache = () => {
    cache.refresh();
}

exports.getAllVideosTXT = () => {
    return toStringItems(this.getAllVideos());
};

exports.getVideosTXT = (items) => {
    return toStringItems(items);
};

exports.getVideos = (filter) => {
    return cache.get(filter);
};

exports.getAllVideos = () => {
    return cache.get();
};

function toStringItems(items) {
    return items.map(item => "\n" + item.name + (item.alias ? ` *(${item.alias})*` : "")).join('');
}