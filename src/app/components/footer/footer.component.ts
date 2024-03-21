import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public todoService = inject(TodoService);
  public todos = this.todoService.todos;
  public undoneTodos = this.todoService.undoneTodos;
  public doneTodos = this.todoService.doneTodos;

  onClearCompleted() {
    this.todoService.clearCompleted();
  }

  onFilterAllTodos() {
    this.todoService.filterAllTodos();
  }

  onFilterActiveTodos() {
    this.todoService.filterActiveTodos();
  }

  onFilterCompletedTodos() {
    this.todoService.filterCompletedTodos();
  }
}
