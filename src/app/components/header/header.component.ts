import { Component, effect, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private todoService = inject(TodoService);
  public searchTerm = signal<string | null>(null);

  onAddTodo($event: Event) {
    this.todoService.addTodo(($event?.target as HTMLInputElement).value);
    this.searchTerm.set(' ');
    // todo... reset field after submitting
  }
}
