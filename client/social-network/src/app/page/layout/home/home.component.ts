import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import {PostComponent} from "../../../shared/components/post/post.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, PostComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
