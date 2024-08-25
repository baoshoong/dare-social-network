import {Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../../model/post.model';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { IdToAvatarPipe } from '../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../shared/pipes/id-to-name.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {IdToImgPipe} from "../../shared/pipes/id-to-img.pipe";

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogClose, AsyncPipe, IdToNamePipe, IdToAvatarPipe, FormsModule, MatFormField, MatInput, MatLabel, ReactiveFormsModule, IdToImgPipe],
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit, AfterViewInit {
  detailPost: PostModel | null = null;

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = history.state;
      this.detailPost = state.post
    });
  }

  ngAfterViewInit() {
    const imgElement = this.imageElement.nativeElement;

    imgElement.onload = () => {
      if (imgElement.naturalWidth > imgElement.naturalHeight) {
        this.renderer.addClass(imgElement, 'scale-width');
      } else {
        this.renderer.addClass(imgElement, 'scale-height');
      }
    };
  }
}
