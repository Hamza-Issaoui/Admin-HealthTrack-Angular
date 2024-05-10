import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../shared/notifications.service';
import { Router } from '@angular/router';
import { AddNotif } from './add-notif.interface';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-notif',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './add-notif.component.html',
  styleUrl: './add-notif.component.css'
})
export class AddNotifComponent {
  createNotifObj: AddNotif;
  constructor(private notifService: NotificationService, private router: Router) {
    this.createNotifObj = new AddNotif();
  }
  onCreateNotif() {
    this.notifService.createNotif(this.createNotifObj).subscribe(
      (res: any) => {
        if (res.status == 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Notification successfully created",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigateByUrl('/notifs/notification');
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.message,
          });
        }
      },
      (error) => {
        console.error('Registration error:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during registration.",
        });
      }
    );
  }

  goToNotifs(): void {
    this.router.navigate(['/notifs/notification']);
  }
}

