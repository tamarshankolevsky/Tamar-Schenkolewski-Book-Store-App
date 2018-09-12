import { Component, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

  //----------------PROPERTIRS-------------------

  //reference to element in html that has local variable named 'inputFile'
  // (local variable in html is declared with # char)
  @ViewChild('inputFile')
  myInputVariable: ElementRef;

  
  //reference to element in html that has local variable named 'imageUpload'
  // (local variable in html is declared with # char)
  @ViewChild('imageUpload')
  imageUpload: ElementRef;

  @Output()
  eventImage: EventEmitter<any>;

  imageControl: FormControl;
  locationUrl: string = null;
  imageName: string = '';
  touched: boolean = false;

  //----------------CONSTRUCTOR------------------

  constructor() {
    this.eventImage = new EventEmitter<any>();
    this.imageControl = new FormControl('', [f => !f.value ? { "val": 'image is required' } : null,]);
  }

  //----------------METHODS-------------------

  showPreviewImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.locationUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.imageName = event.target.files[0].name;
    }
    this.eventImage.emit(event.target.files[0]);
  }

  triggerInputFileEvent() {
    this.touched = true;
    this.myInputVariable.nativeElement.click();
  }
  removeUpload() {
    this.locationUrl = null;
    this.imageControl.setValue(null);
    this.eventImage.emit(null);
  }
}
