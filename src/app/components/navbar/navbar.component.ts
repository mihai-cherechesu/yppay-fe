import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loginForm?: FormGroup;
  public showModal?: boolean;
  public submitted?: boolean;
  public loggedIn?: boolean;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

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
    this.loggedIn  = false;
  }

  show(): void {
    this.showModal = true;
  }

  hide(): void {
    this.showModal = false;
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm?.invalid) {
      return;
    }

    if (this.submitted) {
      const loginFormValue = this.loginForm?.value;

      this.auth.getTokenPair(loginFormValue.username, loginFormValue.password)
        .subscribe(
          tokenPair => {
            this.auth.storeTokenPair(tokenPair.access_token, tokenPair.refresh_token);
            this.loggedIn = true;
            this.router.navigate(['/profile'])
              .then(r => console.log(r));
          },
          error => {
            this.loggedIn = false;
          }
        );

      this.hide();
    }
  }

  logout(): void {
    this.auth.removeTokenPair();
    this.loggedIn = false;
    this.router.navigate(['/landing'])
      .then(r => console.log(r));
  }

}
