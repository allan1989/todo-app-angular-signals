import { Injectable, signal } from '@angular/core';
import { ITodo } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos = signal<ITodo[]>([]);

  addTodo(todo:string) {
    const id = this.uuidv4();
    if(todo) {
      this.todos.update(prev => [...prev, { id:id, body: todo, completed: false }]);
    }
  }

  deleteTodo(id:string) {
    if(id) {
      this.todos.update(prev => prev.filter(todo => todo.id !== id))
    }
  }

  uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c:any) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
  }
}
