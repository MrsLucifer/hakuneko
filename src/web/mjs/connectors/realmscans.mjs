import WordPressMangastream from './templates/WordPressMangastream.mjs';

export default class realmscans extends WordPressMangastream {

    constructor() {
        super();
        super.id = 'realmscans';
        super.label = 'realmscans';
        this.tags = [ 'manga', 'webtoon', 'english' ];
        this.url = 'https://realmscans.com/';
        this.path = '/manga/list-mode/';

        this.queryChaptersTitleBloat = 'span.chapterdate';
    }

    async _getMangas() {
        let mangaList = [];
        for (let page = 1, run = true; run; page++) {
            let mangas = await this._getMangasFromPage(page);
            mangas.length > 0 ? mangaList.push(...mangas) : run = false;
        }
        return mangaList;
    }

    async _getMangasFromPage(page) {
        const uri = new URL('/manga/?page=' + page, this.url);
        const request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, 'div.listupd div.bs div.bsx > a');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, request.url),
                title: element.title.trim()
            };
        });
    }
}