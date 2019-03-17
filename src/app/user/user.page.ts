import { Component, OnInit } from '@angular/core';
import { HnService, User, Item } from '../datastore/hn.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { switchMap, tap, map, flatMap, filter } from 'rxjs/operators';
import { printTime } from '../utils/time.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user$: Observable<User>;
  userId$: Observable<string>;
  createdAt$: Observable<string>;
  previewSubscription$: Subscription;

  userCommentItems$: Observable<Item[]>;
  userStoryItems$: Observable<Item[]>;

  constructor(
    private datastore: HnService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId$ = this.activatedRoute.paramMap
      .pipe(
        map(paramMap => paramMap.get('id'))
      );

    this.user$ = this.userId$.pipe(
      switchMap(userId => this.datastore.getUser(userId))
    )

    this.previewSubscription$ = this.user$.pipe(
      map(user => forkJoin(user.submitted.map(userItemId => this.datastore.getItem(userItemId)))),
      tap(asyncItems => {
        this.userCommentItems$ = asyncItems.pipe(map(items => items.filter(item => item.type === 'comment')))
        this.userStoryItems$ = asyncItems.pipe(map(items => items.filter(item => item.type === 'story')))
      })
    ).subscribe();

    this.createdAt$ = this.user$.pipe(
      map(item => printTime(item.created))
    );
  }

  ionViewWillLeave() {
    this.previewSubscription$.unsubscribe();
  }

  refreshUser(event) {
    console.log('refresh user', event);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  previewOnChanged(event: CustomEvent) {
    console.log('preview onChange', event);
  }

}
