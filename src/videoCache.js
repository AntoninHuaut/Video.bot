const fs = require("fs");
const config = require("../config");

module.exports = class VideoCache {

    constructor(folder) {
        this.refreshInterval = setInterval(() => this.refresh(), config.bot.refreshInterval * 1000);
        this.folder = folder;

        this.cachedRq = {};
        this.refresh();
        console.log(this.get("test"));
        console.log(this.cachedRq);
        console.log(this.get("test2ZD"));
        console.log(this.cachedRq);
    }

    get(filter) {
        if (!this.cachedRq[filter]) {
            const filtered = this.videos.filter(item => {
                let okName = filter == item.name || item.name.includes(filter);
                let okAlias = item.alias && (
                    filter == (item.alias + "_" + item.name) || (item.alias + "_" + item.name).includes(filter)
                );

                return okName || okAlias;
            });

            if(filtered.length === 0)
                return [];
            
            this.cachedRq[filter] = filtered;
        }

        return this.cachedRq[filter];
    }

    refresh() {
        console.log("Refreshing");
        this.videos = this.walk()
            .map(i => new Video(i))
            .sort((i1, i2) => i1.name > i2.name);
    }

    walk() {
        const results = [];
        const list = fs.readdirSync(this.folder);

        list.forEach(file => {
            file = this.folder + '/' + file;
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory())
                results = results.concat(walk(file));
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