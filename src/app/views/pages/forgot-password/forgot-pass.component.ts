import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/authGuard/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [HttpClient],
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPasswordComponent {
  email: string;

  constructor(private authService: AuthService) {
    this.email = '';
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.email).subscribe(
      (res: any) => {
        // Handle success response
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password reset link sent to your email.'
        });
      },
      (error) => {
        console.error('Forgot password error:', error);
        let errorMessage = 'An error occurred while processing your request.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage
        });
      }
    );
  }
}
