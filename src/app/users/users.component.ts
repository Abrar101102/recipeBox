import { Component, inject } from '@angular/core';
import User from '../types/users';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; 
import {CommonModule} from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-users',
  imports: [RouterLink,MatDialogModule,CommonModule,MatPaginatorModule,MatSelectModule,MatInputModule,FormsModule,MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private dialog: MatDialog) {}
  users:User[]=[];
  filteredUsers: User[] = []; 
  paginatedUsers: User[] = [];
  totalUsers: number = 0;
  searchValue: string = ''; // Search input value
  filterBy: string = ''; // Default filter by "Name"
  currentPage: number = 1;
  itemsPerPage: number = 6; 
  totalPages: number = 0; // Default page index
  userService=inject(UserService)
  ngOnInit(){
    this.userService.getUsers().subscribe(result=>{
    this.users=result;
     this.filteredUsers = [...this.users];
     this.calculatePagination(); //pagination update
      // this.updateCurrentPageData();
      console.log(result.length);
      // console.log(this.currentPageData);
    })
    
  }
  // fetchUsers() {
  //   const params = {
  //     page: this.pageIndex + 1, // Backend expects 1-based page index
  //     size: this.pageSize,
  //   };

  //   this.userService.getUsers(params).subscribe((result) => {
  //     this.users = result.users;
  //     this.totalUsers = result.total; // Total count from backend
  //     this.filteredUsers = [...this.users]; // Reset filtered users
  //   });
  // }
  //pagination
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    //this.currentPage = 1; // Reset to the first page
    this.updatePageData();
  }
  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);

  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageData();
    }
  }
  //delete
  delete(id:string){
    const ok=confirm("Are you sure you want to delete recipe?");
    if(ok){
      this.userService.deleteUser(id).subscribe((result)=>{
        alert("Recipe Deleted Sucessfully");
        this.users=this.users.filter((u)=>u._id!=id);//
        this.filteredUsers = this.filteredUsers.filter(user => user._id !== id);
        // this.fetchUsers();
     
      })
    }
  }
 
  //pagination
  // handlePageEvent(event: PageEvent) {
  //   this.pageIndex = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   this.fetchUsers(); // Fetch users based on new pagination settings
  // }
  ;
  // }
  //searching

  applySearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim().toLowerCase()
    console.log('Search Value:', searchValue); // Debug log
  
    if (!searchValue) {
      this.filteredUsers = [...this.users]; // Reset filter if input is empty
      return;
    }
    this.filteredUsers = this.users.filter(user =>
            user.Name.toLowerCase().includes(searchValue)||user.Cuisine.toLowerCase().includes(searchValue)||user.PreparationTime.toString().includes(searchValue)
       );
    // switch (this.filterBy) {
    //   case 'name':
    //     this.filteredUsers = this.users.filter(user =>
    //       user.Name.toLowerCase().includes(searchValue)
    //     );
    //     break;
  
    //   case 'cuisine':
    //     this.filteredUsers = this.users.filter(user =>
    //       user.Cuisine.toLowerCase().includes(searchValue)
    //     );
    //     break;
  
    //   case 'preparationTime':
    //     this.filteredUsers = this.users.filter(user =>
    //       user.PreparationTime.toString().includes(searchValue)
    //     );
    //     break;
  
    //   default:
    //     this.filteredUsers = [...this.users];
    // }
    this.currentPage = 1; // Reset to the first page
    this.calculatePagination();// Reset to the first page after applying the filter
  
    // this.updateCurrentPageData();
  }
  // updateCurrentPageData() {
  //   const startIndex = this.pageIndex * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.currentPageData = this.filteredUsers.slice(startIndex, endIndex);
   
  // }
  sortUsers(column: string): void {
    console.log(column);
    // Toggle the sort order if the same column is clicked, else reset to default
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc'; // Default to ascending order when a new column is clicked
    }
  
    this.filteredUsers.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];
  
      if (valueA == null || valueB == null) {
        return 0; // Handle null or undefined values
      }
  
      const comparison = typeof valueA === 'string'
        ? valueA.localeCompare(valueB) // String comparison
        : valueA - valueB; // Numeric comparison
  
      return this.sortOrder === 'asc' ? comparison : -comparison; // Adjust for sort order
    });
    this.calculatePagination();
  }
   
  sortColumn: string = '';
    sortOrder: 'asc' | 'desc' = 'asc';
    //dialog
    openDialog() {
      
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        height:'300px',
        data: {},
      });
    }
   
}
