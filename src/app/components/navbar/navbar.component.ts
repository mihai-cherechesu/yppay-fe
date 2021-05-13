import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loginForm?: FormGroup;
  public showModal?: boolean;
  public submitted?: boolean;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService) { }

  get f(): { [p: string]: AbstractControl } | undefined {
    return this.loginForm?.controls;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, ]],
      password: ['', [Validators.required, ]]
    });
    this.showModal = false;
    this.submitted = false;
  }

  show(): void {
    this.showModal = true;
  }

  hide(): void {
    this.showModal = false;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm?.invalid) {
      return;
    }

    if (this.submitted) {
      const loginFormValue = this.loginForm?.value;

      this.auth.getTokenPair(loginFormValue.username, loginFormValue.password)
          .subscribe(tokenPair => { this.auth.storeTokenPair(tokenPair.access_token, tokenPair.refresh_token); console.log(tokenPair); });

      this.hide();
    }
  }
}
