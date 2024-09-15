import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-personal-account',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './personal-account.component.html',
  styleUrl: './personal-account.component.css'
})
export class PersonalAccountComponent implements OnInit {


  ngOnInit(): void {

  }

 
}
