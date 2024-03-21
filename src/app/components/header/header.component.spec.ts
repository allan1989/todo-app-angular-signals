import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let app: any;
  let service: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TodoService);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject service TodoService', () => {
    expect(service).toBeTruthy();
  });

  it('displays the correct title', () => {
    const expectedTitle = 'todos';
    const targetDOM = fixture.debugElement.query(By.css('.header_title'))
      .nativeElement.textContent;
    expect(targetDOM).toBe(expectedTitle);
  });

  it('should not select all todos initially', () => {
    expect(app.allSelected()).toBe(false);
  });

  it('should not have any todos initially', () => {
    service.todos.set([]);
    fixture.detectChanges();
    expect(app.hasTodos()).toEqual(0);
  });

  it('invokes method toggleAll when input is checked', () => {
    const spy1 = spyOn(app, 'toggleAll').and.callThrough();
    const spy2 = spyOn(service, 'toggleAll');
    const inputCheckbox = fixture.debugElement.query(
      By.css('.header_checkbox')
    );
    const value = true;
    inputCheckbox.triggerEventHandler('click', {
      target: { value: value },
    });
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('invokes method addTodo when typing', () => {
    const spy1 = spyOn(service, 'addTodo');
    const spy2 = spyOn(app, 'onAddTodo').and.callThrough();
    const textInput = fixture.debugElement.query(By.css('.header_input'));
    const value = 'trigger input event';
    textInput.triggerEventHandler('keyup.enter', {
      target: { value: value },
    });
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(textInput.nativeElement.value).toEqual('');
  });

  it('does not contain the visible where there are no todos', () => {
    const inputCheckbox = fixture.debugElement.query(By.css('.header_checkbox'))
      .nativeElement as HTMLInputElement;
    expect(inputCheckbox.classList).not.toContain('visible');
  });

  it('does contain the visible where there are todos', () => {
    const inputCheckbox = fixture.debugElement.query(By.css('.header_checkbox'))
      .nativeElement as HTMLInputElement;
    service.todos.set([{ id: '999', body: 'lorem', completed: true }]);
    fixture.detectChanges();
    expect(inputCheckbox.classList).toContain('visible');
  });
});
