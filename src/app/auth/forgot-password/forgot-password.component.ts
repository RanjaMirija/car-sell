import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  ForgotPasswordForm!: FormGroup;
  message!: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForgotPassword();
  }

  initForgotPassword(): void {
    this.ForgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmitForgotPasswordForm(): void {
    this.authService.sendPasswordResetEmail(this.ForgotPasswordForm.value.email)
    .then(()=>{
      this.message = 'L\'email de réinitialisation du mot de passe a été envoyé à votre adresse.'
    }).catch(console.error);
  }

}
