import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, map, merge, startWith, switchMap, tap } from 'rxjs';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UsersState{
  users: User[],
  selectedUserId: number,
  selectedUser: User
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
 
  //private http = inject(HttpClient);

  urlAllUsers: string = "https://jsonplaceholder.typicode.com/users";
  urlSingleUser: string = "https://jsonplaceholder.typicode.com/users/";

  //sources 
  getOneUser$ = new Subject<number>();

  //state
  private usersStateSignal = signal<UsersState>({
    users: [],
    selectedUserId: 1,
    selectedUser: {} as User
  });

  //selectors
  public selectedUserIdSignal = computed(() => this.usersStateSignal()?.selectedUserId);
  public selectedUserSignal = computed(() => this.usersStateSignal()?.selectedUser);



  constructor(private http: HttpClient) {
    this.getOneUser$.pipe(
      switchMap((userId) => 
        this.getOneUser(userId).pipe(
          catchError((err) => this.handleError(err)),
        )
      ),
    ).subscribe((user) => {
      this.usersStateSignal.update((state) => ({...state, selectedUser: user}))
    })
   }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.urlAllUsers).pipe(
      tap(() => console.log("Requested all users"))
    )
  }

  getOneUser(userId: number): Observable<User>{
    return this.http.get<User>(this.urlSingleUser + userId).pipe(
      tap(() => console.log("Requested user " + userId))
    )
  }

  private handleError(err: any) {
    console.log(err);
    return EMPTY;
  }
}
