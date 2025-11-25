import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService, AccessRequest } from '../casbin.service';

@Component({
  selector: 'app-access-checker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access-checker.html',
  styleUrl: './access-checker.css',
})
export class AccessCheckerComponent {
  request: AccessRequest = { Subject: '', Domain: '', Object: '', Action: '' };
  result: boolean | null = null;

  constructor(private casbinService: CasbinService) { }

  checkAccess() {
    this.casbinService.checkAccess(this.request).subscribe({
      next: (res) => this.result = res.allowed,
      error: (err) => alert('Error checking access: ' + err.message)
    });
  }
}
