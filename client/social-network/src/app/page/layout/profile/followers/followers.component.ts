import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [
    NgForOf,
    MatButton
  ],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss'
})
export class FollowersComponent {

}
