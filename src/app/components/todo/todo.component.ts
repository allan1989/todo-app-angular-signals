import { Component, Input, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input({required: true}) body!:string;
  @Input({required: true}) id!:string;

  private todoService = inject(TodoService);

  onDeleteTodo(id:any) {
    this.todoService.deleteTodo(id)
  }
}
