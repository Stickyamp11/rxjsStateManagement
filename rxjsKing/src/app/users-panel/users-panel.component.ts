import { Component, Signal, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-users-panel',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './users-panel.component.html',
  styleUrl: './users-panel.component.scss'
})
export class UsersPanelComponent {
  private userService = inject(UsersService)
  public users$!: Observable<User[]>
  public selectedUser: Signal<number>
  public selectedUserSignal!: Signal<User>

  constructor(){
    this.users$ = this.userService.getAll();
    this.selectedUser = this.userService.selectedUserIdSignal;
    this.selectedUserSignal = this.userService.selectedUserSignal;
  }

  userClicked(id: number): void {
this.userService.getOneUser$.next(id);
  }


}
