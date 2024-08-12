import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaterialModule} from "../../material.module";
// import {PostModel} from "../../../model/post.model";
import {NgIf} from "@angular/common";

export interface CommentModel {
  userName: string;
  avatarUrl: string;
  comment: string;
  date: string;
}

export interface PostModel {
  id: number;
  userName: string;
  avatarUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
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
