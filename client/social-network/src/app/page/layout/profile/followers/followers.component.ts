import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [
    NgForOf,
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix
  ],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss'
})
export class FollowersComponent {

}
