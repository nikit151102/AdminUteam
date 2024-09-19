import { Component } from '@angular/core';
import { SpecialtiesService } from '../services/specialties.service';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [TagsComponent],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css'
})
export class SpecialtiesComponent {

  constructor( public specialtiesService: SpecialtiesService){}
}
