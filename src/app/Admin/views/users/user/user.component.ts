import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../shared/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userId: any;
  action: any;
  user: any;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe((params: any) => {
      this.userId = params.get('id')
      this.action = params.get('action');

      this.userService.getOneUser(this.userId).subscribe((data) => {
        this.user = data;
        console.log("user", data);
        

      })
    });
  }
  updateUser() {
    const values = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      phone: this.user.phone,
      role: this.user.role
    };
    this.userService.updateUser(this.userId, values).subscribe(
      (data) => {
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/users/users');
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "An error occurred while updating user information.",
        });

        console.error('Error updating user:', error);
      }
    );
  }
  goToUsers(): void {
    this.router.navigate(['/users/users']);
  }
}
