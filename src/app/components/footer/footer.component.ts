import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Filter } from '../../models/todos';

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
    this.todoService.setFilter(Filter.ALL);
  }

  onFilterActiveTodos() {
       this.todoService.setFilter(Filter.ACTIVE);
  }

  onFilterCompletedTodos() {
       this.todoService.setFilter(Filter.COMPLETED);
  }
}
