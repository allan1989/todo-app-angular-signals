import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let service: TodoService;
  let app: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TodoService);
    app = fixture.componentInstance;
    app.todo = { id: 'TRF65', body: 'lorem', completed: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds the class selected if todo is completed', () => {
    app.todo = { id: 'TRF65', body: 'lorem', completed: true };
    fixture.detectChanges();
    const targetDOM = fixture.debugElement.query(By.css('.todo_list-item'));
    expect(targetDOM.nativeElement.classList).toContain('selected');
  });

  it('does not add the class selected if todo is not completed', () => {
    const targetDOM = fixture.debugElement.query(By.css('.todo_list-item'));
    expect(targetDOM.nativeElement.classList).not.toContain('selected');
  });

  it('invokes the method todoToggle from service', () => {
    const sp1 = spyOn(app, 'onTodoToggle').and.callThrough();
    const sp2 = spyOn(service, 'todoToggle');
    const dummyTodo = { id: 'TRF65', body: 'lorem', completed: true };
    const inputCheckbox = fixture.debugElement.query(
      By.css('.todo_list-item-checkbox')
    );
    inputCheckbox.triggerEventHandler('click', dummyTodo);
    expect(sp1).toHaveBeenCalledWith('TRF65');
    expect(sp2).toHaveBeenCalledWith('TRF65');
  });

  it('invokes the method deleteTodo from service', () => {
    const sp1 = spyOn(app, 'onDeleteTodo').and.callThrough();
    const sp2 = spyOn(service, 'deleteTodo');
    const expectedTodo = { id: 'TRF65', body: 'lorem', completed: false };
    const button = fixture.debugElement.query(
      By.css('.todo_list-item-delete-button')
    );
    button.triggerEventHandler('click', app.todo);
    expect(sp1).toHaveBeenCalledWith(expectedTodo);
    expect(sp2).toHaveBeenCalledWith('TRF65');
  });

  it('displays the correct todo initially', () => {
    const targetDOM = fixture.debugElement.query(By.css('.todo_list-item-body'))
      .nativeElement.textContent;
    expect(targetDOM).toEqual('lorem');
  });

  describe('Edit Directive', () => {
    let targetDOM: any;
    beforeEach(() => {
      targetDOM = fixture.debugElement.query(By.css('.todo_list-item-body'));
    });

    it('sets the attribute contenteditable on double click', () => {
      targetDOM.triggerEventHandler('dblclick');
      expect(targetDOM.nativeElement.getAttribute('contenteditable')).toBe(
        'true'
      );
    });

    it('modifies todo if there is content', () => {
      const spy1 = spyOn(service, 'modifyTodo');
      targetDOM.triggerEventHandler('focusout', {
        currentTarget: {
          textContent: 'toto',
        },
      });
      expect(spy1).toHaveBeenCalled();
    });

    it('deletes todo if there is no content', () => {
      const spy1 = spyOn(service, 'deleteTodo');
      targetDOM.triggerEventHandler('focusout', {
        currentTarget: {
          textContent: '',
        },
      });
      expect(spy1).toHaveBeenCalled();
    });
  });
});
