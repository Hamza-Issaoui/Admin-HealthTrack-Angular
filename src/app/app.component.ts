import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './shared/authGuard/auth.service';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './Admin/icons/icon-subset';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/users.service';
import { NotificationService } from './shared/notifications.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [AuthService, UserService, NotificationService],

})
export class AppComponent implements OnInit {
  title = 'Admin Template';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
