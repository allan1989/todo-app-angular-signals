import { Component, Input, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITodo } from '../../models/todos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input({ required: true }) todo!: ITodo;

  private todoService = inject(TodoService);

  onDeleteTodo(todo: ITodo) {
    this.todoService.deleteTodo(todo.id);
  }

  onTodoToggle(id: string) {
    this.todoService.todoToggle(id);
  }
}
