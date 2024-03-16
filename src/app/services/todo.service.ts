import {
  Injectable,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { ITodo } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos: WritableSignal<ITodo[]> = signal<ITodo[]>([]);
  public filteredTodos: WritableSignal<ITodo[]> = signal<ITodo[]>([]);
  public isToggled: WritableSignal<boolean> = signal<boolean>(false);
  public allSelected: WritableSignal<boolean> = signal<boolean>(false);
  public undoneTodos = computed(
    () => this.todos().filter((todo) => todo.completed === false).length
  );
  public doneTodos = computed(
    () => this.todos().filter((todo) => todo.completed === true).length
  );
  public hasTodos = computed(() => this.todos().length);

  private e = effect(
    () => {
      const todos = this.todos().length;
      const todosCompleted = this.todos().filter(
        (todo) => todo.completed
      ).length;
      if (this.todos().length === 0) {
        this.allSelected.set(false);
      } else {
        this.allSelected.set(todos === todosCompleted);
      }
    },
    {
      allowSignalWrites: true,
    }
  );

  addTodo(todo: string) {
    const id = this.uuidv4();
    if (todo) {
      this.todos.update((prev) => [
        ...prev,
        { id: id, body: todo, completed: false },
      ]);
    }
    this.setFilteredTodos(this.todos());
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
    this.setFilteredTodos(this.todos());
  }

  clearCompleted() {
    this.todos.update((prev) =>
      prev.filter((todo) => todo.completed === false)
    );
    this.setFilteredTodos(this.todos());
  }

  filterAllTodos() {
    this.setFilteredTodos(this.todos());
  }

  filterActiveTodos() {
    const activeTodos = this.todos().filter((todo) => todo.completed === false);
    this.setFilteredTodos(activeTodos);
  }

  filterCompletedTodos() {
    const completedTodos = this.todos().filter(
      (todo) => todo.completed === true
    );
    this.setFilteredTodos(completedTodos);
  }

  setFilteredTodos(todos: ITodo[]) {
    this.filteredTodos.set(todos);
  }

  deleteTodo(id: string) {
    if (id) {
      this.todos.update((prev) => prev.filter((todo) => todo.id !== id));
      this.filteredTodos.set(this.todos());
    }
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
