import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ITodo } from '../../models/todos';
import { FormsModule } from '@angular/forms';
import { EditDirective } from '../../directives/edit.directive';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, EditDirective],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  private todoService = inject(TodoService);

  @Input({ required: true }) todo!: ITodo;

  onDeleteTodo(todo: ITodo) {
    this.todoService.deleteTodo(todo.id);
  }

  onTodoToggle(id: string) {
    this.todoService.todoToggle(id);
  }
}
