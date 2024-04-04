import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { ITodo } from './models/todos';
import { TodoService } from './services/todo.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  let service: TodoService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.inject(TodoService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should inject the service todoService', () => {
    expect(service).toBeTruthy();
  });

  it('renders the correct title', () => {
    const expectedTitle = 'Todo App Using Signals !';
    expect(app.title).toBe(expectedTitle);
  });

  it('displays the correct title', () => {
    const expectedTitle = 'todos';
    const targetDOM = fixture.debugElement.query(By.css('.header_title'))
      .nativeElement as HTMLHeadingElement;
    expect(targetDOM.textContent).toBe(expectedTitle);
  });

  it('should not have any todos initially', () => {
    const todosList = fixture.debugElement.query(By.css('.section_list'));
    expect(service.todos()).toEqual([]);
    expect(app.data()).toEqual([]);
    expect(todosList).toBeNull();
  });

  it('should not have any filteredTodos initially', () => {
    expect(app.data()).toEqual([]);
  });

  it('should display a list when there are todos', () => {
    const dummyData: ITodo[] = [
      { id: '98UY7', body: 'lorem', completed: false },
      { id: 'YT67T', body: 'ipsum', completed: true },
      { id: 'CF98', body: 'dolor', completed: false },
    ];
    service.todos.set(dummyData);
    fixture.detectChanges();
    const todosList = fixture.debugElement.query(By.css('.section_list'))
      .nativeElement as HTMLUListElement;
    expect(todosList.children.length).toEqual(3);
  });
});
