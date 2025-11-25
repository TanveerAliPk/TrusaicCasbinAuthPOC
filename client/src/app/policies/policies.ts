import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CasbinService, PolicyRequest } from '../casbin.service';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policies.html',
  styleUrl: './policies.css',
})
export class PoliciesComponent implements OnInit {
  policies: string[][] = [];
  newPolicy: PolicyRequest = { Subject: '', Domain: '', Object: '', Action: '' };

  constructor(private casbinService: CasbinService) { }

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies() {
    this.casbinService.getPolicies().subscribe({
      next: (data) => this.policies = data,
      error: (err) => console.error('Failed to load policies', err)
    });
  }

  addPolicy() {
    this.casbinService.addPolicy(this.newPolicy).subscribe({
      next: () => {
        this.loadPolicies();
        this.newPolicy = { Subject: '', Domain: '', Object: '', Action: '' };
      },
      error: (err) => alert('Failed to add policy: ' + err.message)
    });
  }

  deletePolicy(policy: string[]) {
    // Map array to object for the API
    const req: PolicyRequest = {
      Subject: policy[0],
      Domain: policy[1],
      Object: policy[2],
      Action: policy[3]
    };
    this.casbinService.removePolicy(req).subscribe({
      next: () => this.loadPolicies(),
      error: (err) => alert('Failed to delete policy')
    });
  }
}
