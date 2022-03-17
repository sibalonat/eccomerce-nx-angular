import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories = [
    {
      id: 1,
      name: "category-1",
      icon: "icon-1"
    },
    {
      id: 2,
      name: "category-2",
      icon: "icon-1"
    },
    {
      id: 3,
      name: "category-3",
      icon: "icon-1"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
