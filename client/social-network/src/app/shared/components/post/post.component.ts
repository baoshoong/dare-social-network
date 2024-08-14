import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {NgForOf, NgIf} from "@angular/common";
import {DetailPostComponent} from "../detail-post/detail-post.component";
import {PostModel} from "../../../page/layout/home/home.component";


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, NgForOf, DetailPostComponent, NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})


export class PostComponent {
  @Input() post!: PostModel;
  @Output() postSelected = new EventEmitter<PostModel>();

  openPostDetail() {
    this.postSelected.emit(this.post);
    console.log(this.post);
  }
}
