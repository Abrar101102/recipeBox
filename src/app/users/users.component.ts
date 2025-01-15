import { Component, inject } from '@angular/core';
import User from '../types/users';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-users',
  imports: [RouterLink,MatPaginatorModule,MatSelectModule,MatInputModule,FormsModule,MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users:User[]=[];
  filteredUsers: User[] = []; 
  // currentPageData: User[] = [];
  searchValue: string = ''; // Search input value
  filterBy: string = 'name'; // Default filter by "Name"
  pageSize: number = 5; // Default page size
  pageIndex: number = 0; // Default page index
  userService=inject(UserService)
  ngOnInit(){
    this.userService.getUsers().subscribe(result=>{
      this.users=result;
      this.filteredUsers = [...this.users];
      // this.updateCurrentPageData();
      //console.log(this.users);
      // console.log(this.currentPageData);
    })
  }
  delete(id:string){
    const ok=confirm("Are you sure you want to delete recipe?");
    if(ok){
      this.userService.deleteUser(id).subscribe((result)=>{
        alert("Recipe Deleted Sucessfully");
        this.users=this.users.filter((u)=>u._id!=id);//
        this.filteredUsers = this.filteredUsers.filter(user => user._id !== id);
        // this.updateCurrentPageData();
      })
    }
  }
 
  //pagination
   handlePageEvent(event: PageEvent) {
     this.pageIndex = event.pageIndex;
     this.pageSize = event.pageSize;
 
 }
  
  // }
  //searching
  // applySearch(event: Event) {
  //   const searchValue = (event.target as HTMLInputElement).value.toLowerCase();

  //   // Filter based on RecipeID, Name, Ingredients, Cuisine, and PreparationTime
  //   this.filteredUsers = this.users.filter(recipe =>
  //     recipe.Name.toLowerCase().includes(searchValue) ||
  //     recipe.Cuisine.toLowerCase().includes(searchValue) ||
  //     recipe.Ingredients.some((ingredient: string) =>
  //       ingredient.toLowerCase().includes(searchValue)
  //     ) ||
  //     recipe.RecipeID.toString().includes(searchValue) || // Convert RecipeID to string
  //     recipe.PreparationTime.toString().includes(searchValue) // Convert PreparationTime to string
  //   );
  // }
  applySearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim().toLowerCase();
    console.log('Search Value:', searchValue); // Debug log
  
    if (!searchValue) {
      this.filteredUsers = [...this.users]; // Reset filter if input is empty
      return;
    }
  
    switch (this.filterBy) {
      case 'name':
        this.filteredUsers = this.users.filter(user =>
          user.Name.toLowerCase().includes(searchValue)
        );
        break;
  
      case 'cuisine':
        this.filteredUsers = this.users.filter(user =>
          user.Cuisine.toLowerCase().includes(searchValue)
        );
        break;
  
      case 'preparationTime':
        this.filteredUsers = this.users.filter(user =>
          user.PreparationTime.toString().includes(searchValue)
        );
        break;
  
      default:
        this.filteredUsers = [...this.users];
    }
    this.pageIndex = 0; // Reset to the first page after applying the filter
    // this.updateCurrentPageData();
  }
  // updateCurrentPageData() {
  //   const startIndex = this.pageIndex * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.currentPageData = this.filteredUsers.slice(startIndex, endIndex);
   
  // }
  sortUsers(column: string): void {
    console.log(column);
    if (this.sortColumn === column) {
      // Toggle sort order if the same column is clicked
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column and default sort order
      this.sortColumn = column;
      this.sortOrder = 'desc';
    }
   
    this.filteredUsers.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];
   
      if (valueA == null || valueB == null) {
        return 0;
      }
   
      const comparison = typeof valueA === 'string'
        ? valueA.localeCompare(valueB)
        : valueA - valueB;
   
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
   
  sortColumn: string = '';
    sortOrder: 'asc' | 'desc' = 'asc';
   
}
