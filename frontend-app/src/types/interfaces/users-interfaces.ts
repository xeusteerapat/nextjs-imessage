export interface SearceUsersInput {
  username: string;
}

export interface SearceUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
}
