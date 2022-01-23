import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {array_move} from '../../utilities';
import { TodoItem } from './TodoItem';
import { useParams } from 'react-router-dom';


export const TodoList = (props) => {
    const [ todos, _setTodos ] = useState([]);
    const { mode } = props ?? false;
    let { id } = useParams();

    

    const syncStateToDB = (newTodos) => {
        
        const authUrl = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/update-todo';
        const token = localStorage.getItem('token');
        
        fetch(authUrl,{
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer' + token
            },
            body: JSON.stringify({todos: newTodos, id: id})
        }).then(response => {
            if(response.status !== 200){
                console.log('Something went wrong');
            }
        });
    };

    const setTodos = (todos) => {
        _setTodos(todos);
        syncStateToDB(todos);
    };

    const handleChange = id => {
        
        setTodos(
            todos.map(todo => {
                if(todo.id === id){
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        );
    }
    const handleTaskEdit = (id, newText) => {
        
        setTodos(todos.map(todo => {
                if(todo.id === id){
                    return {
                        ...todo,
                        text: newText
                    };
                }
                return todo;
            }) );

    }
    const handleTaskCreate = e => {
        e.preventDefault();
        let val = e.target.elements[0].value;
        if(val.length){
            e.target.elements[0].value = '';
            
            const ids = todos.map(object => {
                return object.id;
            });
            
            let nextId = 1;
            if(ids.length > 0){
                nextId = Math.max(...ids) + 1;
            }
            
            setTodos( [...todos, {
                id: nextId,
                text: val,
                completed: false
            }] );
        }
    }
    const handleTaskDelete = x => {
        setTodos( todos.filter(task => {
            return task.id !== x;
        }) );
    }

    const handleTaskMove = (x, direction) => {
        
        const currentIndex = todos.findIndex(each => each.id === x);
        let newIndex = currentIndex;
        
        const length = todos.length;
        if(direction === 'up' && currentIndex !== 0){
            newIndex--;
        }else if(direction === 'down' && currentIndex !== length-1){
            newIndex++;
        }
        array_move(todos, currentIndex, newIndex);
        
        setTodos( todos );
            
    }

    const todoItemComponents = todos.map(item => {
        return <TodoItem
        key={item.id}
        item={item}
        handleChange={handleChange}
        handleTaskDelete={handleTaskDelete}
        handleTaskMove={handleTaskMove}
        handleTaskEdit={handleTaskEdit}
        />
    });   

    useEffect(() => {
        let isSubscribed = true;
        let url = process.env.REACT_APP_API_DOMAIN + '/wp-json/ddapi/todo/get';
        const token = localStorage.getItem('token');
        
        if(mode === 'specific' && typeof id !== 'undefined'){
            url += '/' + id;
        }
            
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data !== 404 && isSubscribed){
                _setTodos( JSON.parse(data) );
            }
        });
        
        return () => (isSubscribed = false);
    }, [id, _setTodos, mode]);

    return(
        <div className="todos">
        <div className="todos-items">
        {todoItemComponents}
        </div>
        <Form onSubmit={handleTaskCreate} className='new-task-form'>
                    
        <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
        Describe your new task
        </Form.Label>
        <Form.Control name="newTaskText" id="newTaskText" placeholder="Describe your new task" />
        <Button type="submit">Add</Button>
        </Form>
        {todos.length === 0 && 
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