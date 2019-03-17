import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/datastore/hn.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {

  @Input() item: Item;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToParent() {
    this.router.navigate(['/items', this.item.parent]);
  }

}
