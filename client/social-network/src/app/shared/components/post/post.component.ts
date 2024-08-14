import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {NgForOf, NgIf} from "@angular/common";
import {DetailPostComponent} from "../detail-post/detail-post.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, NgForOf, DetailPostComponent, NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post: any;
  @Output() imageClick = new EventEmitter<void>();

  onImageClick() {
    this.imageClick.emit();
  }
}
