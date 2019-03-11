import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HnService, Item } from 'src/app/datastore/hn.service';

@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html'
})
export class CommentComponent implements OnInit {

  // tree depth of comment from root
  @Input() level: number; 
  @Input() commentId: number;
  item$: Observable<Item>;

  constructor(private datastore: HnService) {
  }

  ngOnInit() {
    console.log('loading commentId', this.commentId);
    this.item$ = this.datastore.getItem(this.commentId);
  }

}