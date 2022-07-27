class Todo {

    constructor(){
    this.inputValue = document.querySelector('#todoInput');
    this.addBtn = document.querySelector('#button');
    this.todoList = document.querySelector('#todoList');
    this.addEventToButton();
    }

    addEventToButton() {
        this.addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.addTodo();
          this.inputValue.value = '';
        });
    }

    addTodo() {
        const typedText = this.inputValue.value.trim();
        if (typedText === '') {
            alert('Todo should not be empty')
        } else {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between p-3';
            li.innerHTML = `<span>
                                <input type="checkbox" />
                                <div class="edit-input d-inline d-none">
                                    <input type="text" placeholder="Enter value" />
                                    <button class="updateBtn btn btn-sm btn-primary">Update</button>
                                    <button class="cancelBtn btn btn-sm btn-danger">Cancel</button>
                                </div>
                                <p class="todo-input d-inline">${typedText}</p>
                            </span>
                            <div>
                                <i class="bi bi-pencil-square px-1"></i>
                                <i class="bi bi-trash px-1"></i>
                            </div>`;
            todoList.append(li);
        }
    }

    removeTodo(trash) {
        trash.closest('.list-group-item').remove();
    }
    
    editTodo(editInput , p) {
        editInput.value = p.textContent.trim();
        this.toggleEditContainer(editInput.parentElement , p);
    }
    
    toggleEditContainer (editContainer , p){
        p.classList.toggle('d-none');
        editContainer.classList.toggle('d-none');
    };

    updateTodo(p , updatedValue){
        p.textContent = updatedValue;
        console.dir(p.previousElementSibling);
        this.toggleEditContainer(p.previousElementSibling , p)
    }

    check(p){
        p.classList.toggle('text-decoration-line-through');
    }

}

const todo = new Todo();

todoList.addEventListener('click' , e => {

    // === Remove === //
    if (e.target.classList.contains('bi-trash')){
        todo.removeTodo(e.target);
    }

    // === Edit === //
    if (e.target.classList.contains('bi-pencil-square')) {
        const li = e.target.closest('.list-group-item');
        const editInput = li.querySelector('.edit-input>input');
        const p = li.firstElementChild.lastElementChild;
        todo.editTodo(editInput , p);
    }

    // === Update === //
    if (e.target.classList.contains('updateBtn')) {
        const p = e.target.parentElement.nextElementSibling;
        const updatedValue = e.target.previousElementSibling.value.trim();
        updatedValue ? todo.updateTodo(p , updatedValue ) : alert('Value Cannot be Null');
    }

    // === Cancel === //
    if (e.target.classList.contains('cancelBtn')) {
        todo.toggleEditContainer(e.target.parentElement , e.target.parentElement.nextElementSibling);
    }

    // === Check === //
    if (e.target.type === 'checkbox') {
        todo.check(e.target.nextElementSibling.nextElementSibling);
    }

});