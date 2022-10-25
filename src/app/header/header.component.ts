import { AuthService } from 'src/app/services/auth.service';
import { User } from './../interfaces/user';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currectUserSubscription!: Subscription;
  currentUser!: User;

  title = 'CarSell';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currectUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error
    });
  }

  getTitle(): string {
    return this.title;
  }

  ngOnDestroy(): void {
    this.currectUserSubscription.unsubscribe();
  }



}
