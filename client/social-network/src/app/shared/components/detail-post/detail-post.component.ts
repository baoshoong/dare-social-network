import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
export class DetailPostComponent implements OnInit, OnDestroy {
  @Input() post!: PostModel;
  @Output() closeDetail = new EventEmitter<void>();

  isOverlayVisible = false;
  private clickListener: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.isOverlayVisible = true;
    this.clickListener = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy() {
    this.isOverlayVisible = false;
    document.removeEventListener('click', this.clickListener);
  }

  private onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDetail.emit();
    }
  }
}
