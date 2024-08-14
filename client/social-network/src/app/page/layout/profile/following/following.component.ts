import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [
    NgForOf,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent {

}
