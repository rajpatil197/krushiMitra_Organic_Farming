import { Component } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth';
import {Router,RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    loginForm : FormGroup;
    errorMsg :string ='';
    isLoading : boolean =false;

    constructor(private fb: FormBuilder , private router :Router ,private authService:AuthService){
      this.loginForm = this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
      });
    }

  onSubmit():void{
    if(this.loginForm.invalid){
      return;
    }
    
    this.isLoading= true;
    this.errorMsg='';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response)=>{
        this.isLoading = false;
        console.log("Login Succesfull!",response);
        
        this.router.navigate(['/dashboard']); // Navigate to dashboard or home after successful login
      },
      error:(err)=>{
        this.isLoading = false;
        console.error("Error Message",err);
        this.errorMsg ="Invalid Email or Password , please try again later.";
      }
    });
  }
}
