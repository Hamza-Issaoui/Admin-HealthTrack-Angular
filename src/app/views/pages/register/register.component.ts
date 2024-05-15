import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Register } from './register.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/authGuard/auth.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [FormsModule, HttpClientModule, ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective],
    providers: [HttpClient]
  })
export class RegisterComponent {
  registerObj: Register;
  constructor(private authService: AuthService, private router: Router) {
    this.registerObj = new Register();
  }
  onRegister() {
    this.authService.register(this.registerObj).subscribe(
      (res: any) => {
        if (res.status == 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration Success",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigateByUrl('/login');
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

}

