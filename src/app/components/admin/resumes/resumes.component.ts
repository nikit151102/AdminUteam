import { Component } from '@angular/core';
import { ListCardsComponent } from '../list-cards/list-cards.component';
import { ResumesService } from '../services/resumes.service';

@Component({
  selector: 'app-resumes',
  standalone: true,
  imports: [ListCardsComponent],
  templateUrl: './resumes.component.html',
  styleUrl: './resumes.component.css'
})
export class ResumesComponent {

  constructor(public resumesService: ResumesService) { }

}
