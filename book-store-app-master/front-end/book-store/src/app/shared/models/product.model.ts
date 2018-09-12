export class Product {
    constructor(
        public id:number,
        public title: string,
        public subtitle: string,
        public authors: string[],
        public publisher: string,
        public publishedDate: Date,
        public description: string,
        public pageCount: number,
        public imageLinks:{smallThumbnail:string,thumbnail:string}
    ) { }
}
