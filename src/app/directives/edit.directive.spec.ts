import { EditDirective } from './edit.directive';
import { TodoComponent } from '../components/todo/todo.component';
import { DebugElement, Directive } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ITodo } from '../models/todos';
import { TodoService } from '../services/todo.service';

xdescribe('EditDirective', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let DOMTarget: DebugElement;
  let service: TodoService;
  let directiveInstance: EditDirective;

  const dummyData: ITodo = {
    id: 'YTTFF',
    body: 'lorem ipsum',
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = dummyData;
    service = TestBed.inject(TodoService);
    fixture.detectChanges();
    DOMTarget = fixture.debugElement.query(By.css('.todo_list-item-body'));
  });

  xit('should create an instance', () => {
    const directiveInstance = new EditDirective(DOMTarget);
    expect(directiveInstance).toBeTruthy();
  });

  xit('invokes the method modifyTodo on double click and set attribut contenteditable to true', () => {
    //const sp1 = spyOn(app, 'modifyTodo');
    console.log(this);
    DOMTarget.triggerEventHandler('dblclick');
  });
});
