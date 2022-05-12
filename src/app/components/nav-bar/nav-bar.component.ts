import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onSignOut(): void {
    this.isLoggedIn = false;
    this.tokenStorage.signOut();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
}
