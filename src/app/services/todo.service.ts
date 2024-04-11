import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { ITodo } from '../models/todos';
import { Filter } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos: WritableSignal<ITodo[]> = signal<ITodo[]>([]);
  public currentFilter: WritableSignal<string> = signal<string>(Filter.ALL);
  public isToggled: WritableSignal<boolean> = signal<boolean>(false);
  public data = computed(() => {
    const todos = this.todos();
    const currentFilter = this.currentFilter();
    if (Filter.ACTIVE === currentFilter) {
      return this.todos().filter((todo) => !todo.completed);
    } else if (Filter.COMPLETED === currentFilter) {
      return this.todos().filter((todo) => todo.completed);
    }
    return todos;
  });
  public undoneTodos = computed(
    () => this.todos().filter((todo) => todo.completed === false).length
  );
  public doneTodos = computed(
    () => this.todos().filter((todo) => todo.completed === true).length
  );
  public hasTodos = computed(() => this.todos().length);
  public allSelected = computed(() => {
    const todos = this.todos().length;
    const todosCompleted = this.todos().filter((todo) => todo.completed).length;
    return todos > 0 && todos === todosCompleted;
  });

  addTodo(todo: string) {
    const id = this.uuidv4();
    if (todo) {
      this.todos.update((prev) => [
        ...prev,
        { id: id, body: todo, completed: false },
      ]);
    }
  }

  setFilter(filter: string) {
    this.currentFilter.set(filter);
  }

  todoToggle(id: string) {
    this.todos.update((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  toggleAll(isCompleted: boolean) {
    this.todos.update((prev) =>
      prev.map((todo) => ({ ...todo, completed: isCompleted }))
    );
  }

  clearCompleted() {
    this.todos.update((prev) =>
      prev.filter((todo) => todo.completed === false)
    );
  }

  deleteTodo(id: string) {
    if (id) {
      this.todos.update((prev) => prev.filter((todo) => todo.id !== id));
    }
  }

  modifyTodo(newBody: string, newId: string) {
    this.todos.update((prev) =>
      prev.map((todo) =>
        todo.id === newId ? { ...todo, body: newBody } : todo
      )
    );
  }

  uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
