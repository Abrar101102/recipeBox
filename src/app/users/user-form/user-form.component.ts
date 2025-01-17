import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import User from '../../types/users';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  imports: [MatInputModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  formBuilder=inject(FormBuilder);
  userForm:FormGroup=this.formBuilder.group({
    RecipeID:[''],
    Name:['',[Validators.required]],
    Ingredients:['',[Validators.required]],
    Cuisine:['',[Validators.required]],
    PreparationTime:['',Validators.pattern('^[0-9]+$')]
  })
  
  userService=inject(UserService);
  router=inject(Router);

  //Edit
  route=inject(ActivatedRoute);

  editUserId!:string;
  ngOnInit(){//called after the constructor then used for subscription or further initialization
    this.editUserId=this.route.snapshot.params['id'];
    //console.log("id",id);
    console.log(this.editUserId);
    if(this.editUserId){
      this.userService.getUser(this.editUserId).subscribe(result=>{
        //console.log(result);
        console.log('API result (array):', result);
    
       const userData = Array.isArray(result) ? result[0] : result; 
  
  console.log('User data to patch:', userData);
  this.userForm.patchValue(userData);
   
      })
    }
  }

  updateUser(){
    if(this.userForm.invalid){
      console.log(this.userForm.value);
      alert("Please Provide valid details");
      return;
    }
    const model:User=this.userForm.value;
    this.userService.updateUser(this.editUserId,model).subscribe(result=>{
      alert("Recipe Updated Sucessfully");
      this.router.navigateByUrl("/");
    })
  }

  //add Recipe
  addUser() {
    if (this.userForm.invalid) {
      console.log(this.userForm.value);
      alert("Please Provide valid details");
      return;
    }
  
    // Generate a random RecipeID
    const randomRecipeId = Math.floor(100000 + Math.random() * 900000); // Example: RCP-123456
    console.log('Generated RecipeID:', randomRecipeId);
  
    // Assign the RecipeID to the form value
    const model: User = { ...this.userForm.value, RecipeID: randomRecipeId };
  
    console.log('Form with RecipeID:', model);
  
    this.userService.addUser(model).subscribe(result => {
      alert("Recipe added successfully");
      this.router.navigateByUrl("/");
    });
  }
  
  
}
