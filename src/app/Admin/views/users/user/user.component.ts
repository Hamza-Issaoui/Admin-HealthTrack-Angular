import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/authGuard/auth.service';
import { AddUser } from './create-user.interface';


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
  createUserObj: AddUser;
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.createUserObj = new AddUser();
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: any) => {
      this.userId = params.get('id');
      this.action = params.get('action');

      if (this.userId && this.userId !== 'create') {
        this.userService.getOneUser(this.userId).subscribe(
          (data) => {
            this.user = data;
          },
          (error) => {
            console.error('Error fetching user:', error);
          }
        );
      } else if (this.action === 'Create') {
        this.user = {}; 
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.createUserObj.file = file;
    }
  }

  onCreateUser() {
    const formData = new FormData();
    formData.append('firstname', this.createUserObj.firstname);
    formData.append('lastname', this.createUserObj.lastname);
    if (this.createUserObj.phone !== null && this.createUserObj.phone !== undefined) {
      formData.append('phone', this.createUserObj.phone.toString());
    }    formData.append('role', this.createUserObj.role);
    formData.append('email', this.createUserObj.email);
    formData.append('password', this.createUserObj.password);
    if (this.createUserObj.file) {
      formData.append('file', this.createUserObj.file);
    }

    this.authService.register(formData).subscribe(
      (res: any) => {
        if (res.status == 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Success",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigateByUrl('/admin/users');
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
        this.router.navigateByUrl('admin/users');
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
    this.router.navigate(['admin/users']);
  }
}
