const fs = require("fs");
const config = require("../config");

module.exports = class VideoCache {

    constructor(folder) {
        this.refreshInterval = setInterval(() => this.refresh(), config.bot.refreshInterval * 1000);
        this.folder = folder;

        this.cachedRq = {};
        this.refresh();
    }

    get(filter) {
        if(!filter)
            return this.videos;
        
        if (!this.cachedRq[filter]) {
            const filtered = this.videos.filter(item => {
                let okName = filter == item.name || item.name.includes(filter);
                let okAlias = item.alias && (
                    filter == (item.alias + "_" + item.name) || (item.alias + "_" + item.name).includes(filter)
                );

                return okName || okAlias;
            });

            if (filtered.length === 0)
                return [];

            this.cachedRq[filter] = filtered;
        }

        return this.cachedRq[filter];
    }

    refresh() {
        this.videos = this.walk(this.folder)
            .map(i => new Video(i))
            .sort((i1, i2) => i1.name > i2.name);
        this.cachedRq = {};
    }  

    walk(dir) {
        let results = [];
        let list = fs.readdirSync(dir);

        list.forEach(file => {
            file = dir + '/' + file;
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory())
                results = results.concat(this.walk(file));
            else
                results.push(file);
        });

        return results;
    }

}

class Video {
    constructor(obj) {
        let name = obj.split('/');
        let alias = name[name.length - 2] || undefined;
        name = name[name.length - 1].split('.');
        let extension = name[name.length - 1];
        name = name[name.length - 2];

        this.folder = obj;
        this.name = name;
        this.alias = alias;
        this.extension = extension;
    }
}