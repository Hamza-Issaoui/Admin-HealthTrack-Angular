import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Login } from './login.interface';
import { AuthService } from '../../../shared/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [FormsModule, HttpClientModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle],
    providers: [HttpClient]
  })
export class LoginComponent {

  loginObj: Login;
  constructor(private authService: AuthService, private router: Router) {
    this.loginObj = new Login();
  }
  onLogin() {
    //debugger;
    this.authService.login(this.loginObj).subscribe(
      (res: any) => {
        if (res.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigateByUrl('/dashboard');
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
        console.error('Login error:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during login.",
        });
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

}
