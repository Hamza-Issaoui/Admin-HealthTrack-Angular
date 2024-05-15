import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/authGuard/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [HttpClient],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.scss'
})

export class ResetPasswordComponent  {
  constructor(private authService: AuthService, private router: Router) {
  }

  resetPassword(newPassword: string, resetToken: string): void {
    this.authService.resetPassword(newPassword, resetToken).subscribe(
      (res: any) => {
        // Handle success response
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password reset successfully.",
        });
      },
      (error) => {
        console.error('Reset password error:', error);
        let errorMessage = 'An error occurred while processing your request.';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      }
    );
  }
}