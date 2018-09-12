import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../imports';

@Injectable()
export class ProductService {

    //----------------PROPERTIRS-------------------

    subject = new Subject();
    searchSubject=new Subject();
    products: Product[] = [];

    //----------------CONSTRUCTOR------------------

    constructor(private httpClient: HttpClient) {
        this.subject.subscribe({
            next: (products: Product[]) => this.products = products
        });
    }
    
    //----------------METHODS-------------------

    getAllProducts(term?: string): Observable<any> {

        if (!term || term == '')
            term = 'a';//mean-all products
        let url: string = `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=40&fields=items(saleInfo%2FlistPrice%2CvolumeInfo(authors%2Cdescription%2CimageLinks(smallThumbnail%2Cthumbnail)%2Clanguage%2CmainCategory%2CpageCount%2CpublishedDate%2Cpublisher%2Csubtitle%2Ctitle))`;
        return this.httpClient.get(url);

        //test the project when this http calling is not allowed
        // let products = [
        //     new Product(0, 'cdgfhjk,fmhvjksth  ', 'bbbhfhfghjgf', ['cccfgbvtry', 'fhdhdfthf'], 'dddhydfjutydjdrjn', new Date(), 'eee', 10, 'http://localhost:4200/assets/tmp.JPG'),
        //     new Product(1, 'cdgfhjk,  ', 'bbbhfhfghjgf', [], 'dddhydfjutydjdrjn', new Date(), 'eee', 10, 'http://localhost:4200/assets/tmp.JPG'),
        //     new Product(2, 'cdgfhjk, fmhvjksth  ', 'bbbhfiiiiiii iiiiiiiiii iiiihfghjgf', ['fhdhdfthf'], 'dddhydfjutydjdrjn', new Date(), 'eee', 10, 'http://localhost:4200/assets/tmp.JPG')
        // ];
        // return of(products);
    }

    getProductById(productId: number): Product {
        return this.products.find(product => product.id == productId);
    }


}