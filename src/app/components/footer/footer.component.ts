import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public todoService = inject(TodoService);
  public todos = this.todoService.todos;
}
