import {Component, Input} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {NgIf} from "@angular/common";
import {PostModel} from "../../../page/layout/home/home.component";

export interface CommentModel {
  userName: string;
  avatarUrl: string;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './detail-post.component.html',
  styleUrl: './detail-post.component.scss'
})
export class DetailPostComponent {
  @Input() post!: PostModel;
}
