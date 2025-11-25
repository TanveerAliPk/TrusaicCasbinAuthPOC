import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService, LoginModel } from './casbin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  user: LoginModel | null = null;
  loginData: LoginModel = { Name: 'alice', Email: 'alice@example.com', Role: 'admin' };

  constructor(public casbinService: CasbinService) {}

  ngOnInit() {
    this.casbinService.currentUser$.subscribe(u => this.user = u);
  }

  login() {
    this.casbinService.login(this.loginData).subscribe({
      next: () => {},
      error: (err) => alert('Login failed. Ensure backend is running. ' + err.message)
    });
  }

  logout() {
    this.casbinService.logout();
  }
}
