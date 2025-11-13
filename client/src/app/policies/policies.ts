import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasbinService, CasbinPolicy } from '../casbin.service';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.html',
  styleUrl: './policies.css',
})
export class PoliciesComponent implements OnInit {
  policies: CasbinPolicy[] = [];

  constructor(private casbinService: CasbinService) { }

  ngOnInit(): void {
    this.casbinService.getPolicies().subscribe((policies: CasbinPolicy[]) => {
      this.policies = policies;
    });
  }
}
