import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoaderSkeletonComponent } from './post-loader-skeleton.component';

describe('PostLoaderSkeletonComponent', () => {
  let component: PostLoaderSkeletonComponent;
  let fixture: ComponentFixture<PostLoaderSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLoaderSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLoaderSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
