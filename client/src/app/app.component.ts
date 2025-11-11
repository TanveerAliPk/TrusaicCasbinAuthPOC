import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { User } from './models';

/**
 * AppComponent
 * Root component - handles routing between home and dashboard
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardComponent, HomeComponent],
  template: `
    <div *ngIf="isAuthenticated">
      <app-dashboard></app-dashboard>
    </div>
    <div *ngIf="!isAuthenticated">
      <app-home></app-home>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = user !== null;
    });
  }
}
