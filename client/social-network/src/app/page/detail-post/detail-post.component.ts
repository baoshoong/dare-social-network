import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../layout/home/home.component';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit, AfterViewInit {
  detailPost: PostModel | null = null;

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const navigation = history.state;
      if (navigation && navigation.post) {
        this.detailPost = navigation.post;
      } else {
        console.error('No navigation state found');
      }
    });
  }

  ngAfterViewInit() {
    const imgElement = this.imageElement.nativeElement;

    // Wait for the image to load to get the natural width and height
    imgElement.onload = () => {
      if (imgElement.naturalWidth > imgElement.naturalHeight) {
        this.renderer.addClass(imgElement, 'scale-width');
      } else {
        this.renderer.addClass(imgElement, 'scale-height');
      }
    };
  }
}
