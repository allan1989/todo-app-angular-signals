import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { ITodo } from '../models/todos';
import { TodoService } from '../services/todo.service';

@Directive({
  selector: '[appEdit]',
  standalone: true,
})
export class EditDirective {
  private todoService = inject(TodoService);
  @Input({ required: true }) todo!: ITodo;
  @HostListener('dblclick')
  private modifyTodo() {
    this.el.nativeElement.setAttribute('contenteditable', true);
  }

  @HostListener('focusout', ['$event'])
  protected onFocusOut(event: FocusEvent): void {
    const currentTargetContent = (event.currentTarget as HTMLElement)
      .textContent;
    if (currentTargetContent) {
      this.todoService.modifyTodo(currentTargetContent, this.todo.id);
    } else {
      this.todoService.deleteTodo(this.todo.id);
    }
  }

  constructor(private el: ElementRef) {}
}
