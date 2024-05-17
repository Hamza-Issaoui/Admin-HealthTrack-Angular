import { Component, computed, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent, BadgeComponent, BreadcrumbRouterComponent, ColorModeService, ContainerComponent, DropdownComponent, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, HeaderComponent, HeaderNavComponent, HeaderTogglerDirective, NavItemComponent, NavLinkDirective, ProgressBarDirective, ProgressComponent, SidebarToggleDirective, TextColorDirective, ThemeDirective } from '@coreui/angular';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { WebSocketService } from '../../../shared/webSocket.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/authGuard/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  standalone: true,
  imports: [ContainerComponent, CommonModule, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle]
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {


  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  public notifications: any[] = [];
  public showNotifications: boolean = false;

  @Input() sidebarId: string = 'sidebar1';

  pageSize: number = 5; // Nombre de notifications par page
  currentPage: number = 1; // Page actuelle

  constructor(
    private router: Router,
    private webSocketService: WebSocketService,
    private authService: AuthService

  ) {
    super();
  }

  ngOnInit(): void {
   
    // Subscribe to real-time notifications
    //  const notif = this.webSocketService.listenToNotification()
    //  console.log( notif, 'notiiiiiiif');
    //  const notif1 = this.webSocketService.listenToNotification().subscribe();
    //  console.log( notif1, 'notiiiiiiif1111');

    this.webSocketService.listenToNotification().subscribe(
      (notification: any[]) => {
        this.notifications.push(notification);

      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    console.log("showNotif", this.showNotifications);
    console.log("notificationsAfter", this.notifications);
  }

  logout() {
    this.authService.signOut()
    this.router.navigateByUrl('/login');
  }
}
