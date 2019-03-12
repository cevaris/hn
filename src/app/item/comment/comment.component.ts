import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HnService, Item } from 'src/app/datastore/hn.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})
export class CommentComponent implements OnInit {

  // tree depth of comment from root
  @Input() level: string;
  @Input() commentId: number;

  nextLevel: number;

  item$: Observable<Item>;

  constructor(private datastore: HnService) {
  }

  ngOnInit() {
    console.log('loading commentId', this.commentId);
    this.nextLevel = parseInt(this.level, 10) + 1;
    this.item$ = this.datastore.getItem(this.commentId).pipe(
      filter(comment => {
        if (comment && (comment.dead || comment.deleted)) {
          return false;
        } else {
          return true;
        }
      })
    );
  }

}
