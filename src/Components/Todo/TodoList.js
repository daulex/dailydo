import React from 'react';
import { TodoItem } from './TodoItem';
// import {todosData} from '../Data/todosData';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {array_move} from '../../utilities';


export class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = { todos: [] };
        
        this.handleTaskCreate = this.handleTaskCreate.bind(this);
        this.handleTaskDelete = this.handleTaskDelete.bind(this);
        this.syncStateToDB = this.syncStateToDB.bind(this);
        this.handleTaskMove = this.handleTaskMove.bind(this);
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
    }
    syncStateToDB = () => {
        const authUrl = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/update-todo';
        const token = localStorage.getItem('token');
        
        fetch(authUrl,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer' + token
            },
            body: JSON.stringify(this.state)
        }).then(response => {
            if(response.status !== 200){
                console.log('Something went wrong');
            }
        });
    };
    handleChange = id => {
        const { todos } = this.state;
        this.setState({
            todos: todos.map(todo => {
                if(todo.id === id){
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        }, this.syncStateToDB);
    }
    handleTaskEdit = (id, newText) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.map(todo => {
                if(todo.id === id){
                    return {
                        ...todo,
                        text: newText
                    };
                }
                return todo;
            })
        }, this.syncStateToDB);
    }
    handleTaskCreate = e => {
        e.preventDefault();
        let val = e.target.elements[0].value;
        if(val.length){
            e.target.elements[0].value = '';
            
            const ids = this.state.todos.map(object => {
                return object.id;
            });
            
            let nextId = 1;
            if(ids.length > 0){
                nextId = Math.max(...ids) + 1;
            }
            
            this.setState({ todos: [...this.state.todos, {
                id: nextId,
                text: val,
                completed: false
            }] }, this.syncStateToDB);
        }
    }
    handleTaskDelete = x => {
        this.setState({ todos: this.state.todos.filter(task => {
            return task.id !== x;
        }) }, this.syncStateToDB);
    }
    handleTaskMove = (x, direction) => {
        
        const currentIndex = this.state.todos.findIndex(each => each.id === x);
        let newIndex = currentIndex;
        const length = this.state.todos.length;
        if(direction === 'up' && currentIndex !== 0){
            newIndex--;
        }else if(direction === 'down' && currentIndex !== length-1){
            newIndex++;
        }
        this.setState(
            {todos: array_move(this.state.todos, currentIndex, newIndex)},
            this.syncStateToDB
            );
            
        }
        render(){
            const todoItemComponents = this.state.todos.map(item => {
                return <TodoItem
                key={item.id}
                item={item}
                handleChange={this.handleChange}
                handleTaskDelete={this.handleTaskDelete}
                handleTaskMove={this.handleTaskMove}
                handleTaskEdit={this.handleTaskEdit}
                />
            });        
            return(
                <div className="todos">
                <div className="todos-items">
                {todoItemComponents}
                </div>
                <Form onSubmit={this.handleTaskCreate} className='new-task-form'>
                
                <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                Describe your new task
                </Form.Label>
                <Form.Control name="newTaskText" id="newTaskText" placeholder="Describe your new task" />
                <Button type="submit">Add</Button>
                </Form>
                {this.state.todos.length === 0 && 
                    <div className="todo-from-template">
                        <h3>- or -</h3>
                        <Form.Select aria-label="Todo list from template">
                            <option>Todo list from template</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                }
                </div>
                );
            }
            
            componentDidMount() {
                
                let url = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/todo/get';
                const token = localStorage.getItem('token');
                console.log();
                
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer' + token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data !== 404){
                        const parsed = JSON.parse(data);
                        this.setState({todos: parsed });
                    }
                });
            }
        }