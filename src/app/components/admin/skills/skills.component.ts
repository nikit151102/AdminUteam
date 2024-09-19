import { Component } from '@angular/core';
import { SkillsService } from '../services/skills.service';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TagsComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  constructor( public skillsService: SkillsService){}
}
