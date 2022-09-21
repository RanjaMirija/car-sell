import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  message!: String;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initForgotPassword();
  }

  initForgotPassword(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitForgotPasswordForm(): void {
    this.auth.sendPasswordResetEmail(this.forgotPasswordForm.value.email)
    .then(() => {
      this.message = 'Un email de réinitialisation a été envoyé à l\' adresse : <i>'+ this.forgotPasswordForm.value.email+'</i>';
    })
    .catch(console.error)
  }

}
