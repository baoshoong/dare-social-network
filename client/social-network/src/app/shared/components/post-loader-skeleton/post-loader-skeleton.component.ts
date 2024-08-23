import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AsyncPipe } from '@angular/common';
import { IdToAvatarPipe } from '../../pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../pipes/id-to-name.pipe';

@Component({
  selector: 'app-post-loader-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, AsyncPipe, IdToAvatarPipe, IdToNamePipe],
  templateUrl: './post-loader-skeleton.component.html',
  styleUrl: './post-loader-skeleton.component.scss',
})
export class PostLoaderSkeletonComponent {}
