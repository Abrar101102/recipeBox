import User from "./users";

export interface PaginatedUsersResponse {
    users: User[]; // Array of users for the current page
    total: number; // Total number of users (metadata)
  }