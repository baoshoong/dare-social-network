import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../../model/post.model';
import { ProfileModel } from '../../model/profile.model';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { IdToAvatarPipe } from '../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../shared/pipes/id-to-name.pipe';

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogClose, AsyncPipe, IdToNamePipe, IdToAvatarPipe],
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit, AfterViewInit {
  detailPost: PostModel | null = null;
  profile: ProfileModel | null = null;

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const state = history.state;
      this.detailPost = state.post;
      this.profile = state.profile;
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
