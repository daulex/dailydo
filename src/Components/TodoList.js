import React from 'react';
import { TodoItem } from './TodoItem';
import {todosData} from '../Data/todosData';

export class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = { todos: todosData };
    }
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
        });
    }

    render(){
        const todoItemComponents = this.state.todos.map(item => {
            return <TodoItem key={item.id} item={item} handleChange={this.handleChange} />
        });        
        return(
            <div className="todo-list">
                {todoItemComponents}
            </div>
        );
    }

    componentDidMount() {
        const authUrl = 'http://ddapi.awave.site/wp-json/myplugin/v1/author/1';
        const token = localStorage.getItem('token');

        fetch(authUrl,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer' + token
            }
        })
            .then(response => response.json())
            .then(data => {

                console.log(JSON.parse(data));
            });
      }
}