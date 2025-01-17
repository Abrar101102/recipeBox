import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule,MatToolbarModule,MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  // title = 'frontend';
  // path: string = "../assests/images/first.png";
  // alttext: string = "first image";

}
