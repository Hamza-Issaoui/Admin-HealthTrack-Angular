import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notifications.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [HttpClient],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})

export class NotificationsComponent implements OnInit {
  notifs: any[] = [];

  constructor(
    private router: Router,
    private notifService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.fetchNotifs();
   // this.subscribeToRealTimeNotifications();
  }

  fetchNotifs(): void {
    this.notifService.getAllNotifs().subscribe(
      (data: any) => {
        this.notifs = data.notifs;
        console.log("notifs", this.notifs);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  confirmDelete(notif: any): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert the deletion of ${notif.name} !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.notifService.deleteNotif(notif._id).subscribe(
          (res) => {
            this.fetchNotifs();
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Notification has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting notification:', error);
            swalWithBootstrapButtons.fire(
              'Error!',
              'Failed to delete the notification.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary notification is safe :)',
          'error'
        );
      }
    });
  }


  navigate(id: any, type: string): void {
    this.router.navigate(['admin/notifications/update-notif', {
      id: id,
      action: type
    }]);
  }

  goToCreateNotif(): void {
    this.router.navigate(['admin/notifications/create']);
  }

}