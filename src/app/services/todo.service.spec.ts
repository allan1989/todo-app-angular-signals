import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { ITodo } from '../models/todos';

describe('TodoService', () => {
  let service: TodoService;

  const dummyTodos: ITodo[] = [
    { id: '878', body: 'lorem', completed: false },
    { id: '76FGR', body: 'ispum', completed: true },
    { id: 'FD54', body: 'dolor', completed: false },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default values at 0 and false', () => {
    expect(service.todos().length).toBe(0);
    expect(service.filteredTodos().length).toBe(0);
    expect(service.hasTodos()).toBe(0);
    expect(service.undoneTodos()).toBe(0);
    expect(service.doneTodos()).toBe(0);
    expect(service.isToggled()).toBe(false);
    expect(service.allSelected()).toBe(false);
  });

  it('should add the todo', () => {
    service.addTodo('toto');
    expect(service.todos().length).toBe(1);
    expect(service.filteredTodos().length).toBe(1);
  });

  it('should toggle the todo', () => {
    const testID = '878';
    service.todos.set(dummyTodos);
    service.todoToggle(testID);
    const todo = service.todos().filter((todo) => todo.id === testID);
    expect(todo[0].completed).toBe(true);
  });

  it('should toggle all todos', () => {
    service.todos.set(dummyTodos);
    service.toggleAll(true);
    const result = service.todos().every((todo) => todo.completed === true);
    const result2 = service
      .filteredTodos()
      .every((todo) => todo.completed === true);
    expect(result).toBe(true);
    expect(result2).toBe(true);
  });

  it('should remove completed todos', () => {
    service.todos.set(dummyTodos);
    service.clearCompleted();
    expect(service.todos().length).toBe(2);
    expect(service.filteredTodos().length).toBe(2);
  });

  it('should invoke method setFilteredTodo', () => {
    const spy = spyOn(service, 'setFilteredTodos');
    service.filterAllTodos();
    expect(spy).toHaveBeenCalled();
  });

  it('should filter all active todos', () => {
    const spy = spyOn(service, 'setFilteredTodos');
    service.todos.set(dummyTodos);
    const activeTodos = service
      .todos()
      .filter((todo) => todo.completed === false);
    service.filterActiveTodos();
    expect(spy).toHaveBeenCalledWith(activeTodos);
  });

  it('should return all completed todos', () => {
    const spy = spyOn(service, 'setFilteredTodos');
    service.todos.set(dummyTodos);
    const completedTodos = service
      .todos()
      .filter((todo) => todo.completed === true);
    service.filterCompletedTodos();
    expect(spy).toHaveBeenCalledWith(completedTodos);
  });

  it('sets the field filteredTodos with the given argument', () => {
    service.setFilteredTodos(dummyTodos);
    expect(service.filteredTodos().length).toBe(3);
  });

  it('deletes the todo with the given id', () => {
    service.todos.set(dummyTodos);
    service.deleteTodo('878');
    expect(service.todos().length).toBe(2);
  });

  it('modifies the todo with the given arguments', () => {
    service.todos.set(dummyTodos);
    const newBody = 'toto';
    const newID = '878';
    service.modifyTodo(newBody, newID);
    const foundTodo = service.todos().filter((todo) => todo.id === newID);
    expect(foundTodo[0].body).toBe(newBody);
  });

  it('selects all todos when the number todos is equal to the number of completed todos', () => {
    service.todos.set(dummyTodos);
    service.toggleAll(true);
    TestBed.flushEffects();
    expect(service.allSelected()).toBe(true);
  });

  it('should return the correct number of completed todos', () => {
    service.todos.set(dummyTodos);
    expect(service.undoneTodos()).toBe(2);
  });

  it('should return the correct number of incompleted todos', () => {
    service.todos.set(dummyTodos);
    expect(service.doneTodos()).toBe(1);
  });

  it('generates an id of correct length', () => {
    const randomID = service.uuidv4();
    expect(randomID.length).toBe(36);
  });
});
