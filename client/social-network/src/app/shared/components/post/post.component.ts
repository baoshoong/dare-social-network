import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
// import { PostModel} from "../../../model/post.model";
import {MaterialModule} from "../../material.module";
import {NgForOf, NgIf} from "@angular/common";
import {DetailPostComponent} from "../detail-post/detail-post.component";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

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
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, NgForOf, DetailPostComponent, NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})


export class PostComponent {
  post: PostModel[] = [
    {
      id: 1,
      userName: 'adJohnDoeOane2323',
      avatarUrl: 'https://cdn.myportfolio.com/591d04f256aa901b6f95d035a778faaa/4f6bf891-5a71-4ac9-835b-457eb72462b2_rw_600.png?h=4349d2bcaaf94efadb052ed53cfc97b3',
      title: 'Post 1',
      description: 'This is a post',
      imageUrl: 'https://i.pinimg.com/564x/d4/bc/c4/d4bcc46e371e194b20854acd1ba3a86b.jpg',
      likes: 3000
    },
    {
      id: 2,
      userName: 'Jane Doe',
      avatarUrl: 'https://cdn.myportfolio.com/591d04f256aa901b6f95d035a778faaa/4f6bf891-5a71-4ac9-835b-457eb72462b2_rw_600.png?h=4349d2bcaaf94efadb052ed53cfc97b3',
      title: 'Post 2',
      description: 'This is a post',
      imageUrl: 'https://i.pinimg.com/564x/d4/bc/c4/d4bcc46e371e194b20854acd1ba3a86b.jpg',
      likes: 20
    },
    {
      id: 3,
      userName: 'Jane Doe',
      avatarUrl: 'https://cdn.myportfolio.com/591d04f256aa901b6f95d035a778faaa/4f6bf891-5a71-4ac9-835b-457eb72462b2_rw_600.png?h=4349d2bcaaf94efadb052ed53cfc97b3',
      title: 'Post 2',
      description: 'This is a post',
      imageUrl: 'https://i.pinimg.com/564x/d4/bc/c4/d4bcc46e371e194b20854acd1ba3a86b.jpg',
      likes: 20
    },
    {
      id: 4,
      userName: 'Jane Doe',
      avatarUrl: 'https://cdn.myportfolio.com/591d04f256aa901b6f95d035a778faaa/4f6bf891-5a71-4ac9-835b-457eb72462b2_rw_600.png?h=4349d2bcaaf94efadb052ed53cfc97b3',
      title: 'Post 2',
      description: 'This is a post',
      imageUrl: 'data:image/jpeg;base64,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',
      likes: 20
    },
    {
      id: 5,
      userName: 'Jane Doe',
      avatarUrl: 'https://cdn.myportfolio.com/591d04f256aa901b6f95d035a778faaa/4f6bf891-5a71-4ac9-835b-457eb72462b2_rw_600.png?h=4349d2bcaaf94efadb052ed53cfc97b3',
      title: 'Post 2',
      description: 'This is a post',
      imageUrl: 'https://i.pinimg.com/564x/d4/bc/c4/d4bcc46e371e194b20854acd1ba3a86b.jpg',
      likes: 20
    },
 ]

  // constructor(private dialog: MatDialog) {}
  // dialogRef: MatDialogRef<DetailPostComponent> | null = null;
  //
  // openDetailDialog(): void {
  //   if (!this.dialogRef) {
  //     this.dialogRef = this.dialog.open(DetailPostComponent, {
  //       width: '400px',
  //       disableClose: true, // Prevent closing by clicking outside the dialog
  //     });
  //
  //     this.dialogRef.afterClosed().subscribe(() => {
  //       this.dialogRef = null;
  //     });
  //   }
  // }
  dialog = inject(MatDialog);

  openDialog(post: PostModel) {
    this.dialog.open(DetailPostComponent,{data: post});
    console.log(post);
  }
}

// @Component({
//   selector: 'detail-post',
//   templateUrl: '../detail-post/detail-post.component.html',
//   standalone: true,
//   imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class detailPost {}
