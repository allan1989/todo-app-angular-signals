import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let service: TodoService;
  let app: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TodoService);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates the service', () => {
    expect(service).toBeTruthy();
  });

  it('does not display footer when there are no todos', () => {
    app.todos.set([]);
    fixture.detectChanges();
    const footer = fixture.debugElement.query(By.css('.footer'));
    expect(footer).toBeFalsy();
  });

  it('does display footer when there are todos', () => {
    app.todos.set([{ id: 'yyy', body: 'lorem', completed: true }]);
    fixture.detectChanges();
    const footer = fixture.debugElement.query(By.css('.footer'));
    expect(footer).toBeTruthy();
  });

  it('display the correct number of undoneTodos when there is 1 todo', () => {
    app.todos.set([{ id: 'yyy', body: 'lorem', completed: false }]);
    fixture.detectChanges();
    expect(app.undoneTodos()).toEqual(1);
    const targetDOMElement = fixture.debugElement.query(
      By.css('.footer_infos-items')
    ).nativeElement.textContent;
    expect(targetDOMElement).toEqual('1 item left');
  });

  it('display the correct number of undoneTodos when there are 2 todos', () => {
    app.todos.set([
      { id: 'yyy', body: 'lorem', completed: false },
      { id: 'ff', body: 'dolor', completed: true },
      { id: 'bbb', body: 'set', completed: false },
    ]);
    fixture.detectChanges();
    expect(app.undoneTodos()).toEqual(2);
    const targetDOMElement = fixture.debugElement.query(
      By.css('.footer_infos-items')
    ).nativeElement.textContent;
    expect(targetDOMElement).toEqual('2 items left');
  });

  it('hides the button "clear completed" initially', () => {
    const button = fixture.debugElement.query(By.css('.footer_button-clear'));
    expect(button).toBeFalsy();
  });

  it('invokes the method clearCompleted from service', () => {
    app.todos.set([
      { id: 'yyy', body: 'lorem', completed: false },
      { id: 'ff', body: 'dolor', completed: true },
      { id: 'bbb', body: 'set', completed: false },
    ]);
    fixture.detectChanges();
    const spy1 = spyOn(app, 'onClearCompleted').and.callThrough();
    const spy2 = spyOn(service, 'clearCompleted');
    const button = fixture.debugElement.query(By.css('.footer_button-clear'));
    button.triggerEventHandler('click', null);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(app.doneTodos()).toEqual(1);
    expect(button.nativeElement.classList).toContain('visible');
  });

  it('invokes the method filterAllTodos from service', () => {
    app.todos.set([
      { id: 'yyy', body: 'lorem', completed: false },
      { id: 'ff', body: 'dolor', completed: true },
      { id: 'bbb', body: 'set', completed: false },
    ]);
    fixture.detectChanges();
    const spy1 = spyOn(app, 'onFilterAllTodos').and.callThrough();
    const spy2 = spyOn(service, 'filterAllTodos');
    const button = fixture.debugElement.query(By.css('#button-all-todos'));
    button.triggerEventHandler('click', null);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('invokes the method filterActiveTodos from service', () => {
    app.todos.set([
      { id: 'yyy', body: 'lorem', completed: false },
      { id: 'ff', body: 'dolor', completed: true },
      { id: 'bbb', body: 'set', completed: false },
    ]);
    fixture.detectChanges();
    const spy1 = spyOn(app, 'onFilterActiveTodos').and.callThrough();
    const spy2 = spyOn(service, 'filterActiveTodos');
    const button = fixture.debugElement.query(By.css('#button-active-todos'));
    button.triggerEventHandler('click', null);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('invokes the method filterCompletedTodos from service', () => {
    app.todos.set([
      { id: 'yyy', body: 'lorem', completed: false },
      { id: 'ff', body: 'dolor', completed: true },
      { id: 'bbb', body: 'set', completed: false },
    ]);
    fixture.detectChanges();
    const spy1 = spyOn(app, 'onFilterCompletedTodos').and.callThrough();
    const spy2 = spyOn(service, 'filterCompletedTodos');
    const button = fixture.debugElement.query(
      By.css('#button-completed-todos')
    );
    button.triggerEventHandler('click', null);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
