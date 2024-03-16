import { Component, inject, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('inputRef') inputRef!: ElementRef;

  onAddTodo($event: Event) {
    this.todoService.addTodo(($event?.target as HTMLInputElement).value);
    this.inputRef.nativeElement.value = '';
  }
}
