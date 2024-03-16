import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private todoService = inject(TodoService);
  public allSelected = this.todoService.allSelected;
  public hasTodos = this.todoService.hasTodos;
  @ViewChild('inputRef') inputRef!: ElementRef;

  onAddTodo($event: Event) {
    this.todoService.addTodo(($event?.target as HTMLInputElement).value);
    this.inputRef.nativeElement.value = '';
  }

  toggleAll($event: Event) {
    this.todoService.toggleAll(($event?.target as HTMLInputElement).checked);
  }
}
