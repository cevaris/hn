import { Component, OnInit } from '@angular/core';
import { HnService, User } from '../datastore/hn.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
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

    this.createdAt$ = this.user$.pipe(
      map(item => printTime(item.created))
    );
  }

  doRefresh(event) {
    console.log(event);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
