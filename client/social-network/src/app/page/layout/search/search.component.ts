import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {SEARCH_ROUTES} from "./search.routes";


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchQuery: string = '';
  data = [
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },
    {
      image: '../public/images/img1.png',
      avatar: '../public/images/avt1.png',
      name: 'Rose',
      icon_heart:'../public/images/heart.png',
      icon_comment:'../public/images/chat-bubble.png',
    },

  ]
  protected readonly SEARCH_ROUTES = SEARCH_ROUTES;
}
