import { Component, OnInit, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  selectedImageUrl!: string;

  @Input() images!: string[] | any;


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelected(imageUrl: string)
  {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages()
  {
    return this.images?.length > 0;
  }

}
