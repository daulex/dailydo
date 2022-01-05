import React from 'react';
import { TodoItem } from './TodoItem';
// import {todosData} from '../Data/todosData';

export class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = { todos: [], todosCache: [] };
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
        }, function(){
            const authUrl = 'http://ddapi.awave.site/wp-json/ddapi/update-todo';
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
                const parsed = JSON.parse(data);
                this.setState({todos: parsed, todosCache: parsed })
            });
      }
}