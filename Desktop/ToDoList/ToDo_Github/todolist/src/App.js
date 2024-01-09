import logo from './logo.svg';
import './App.css';
import Todo from './Components/Todo';
import Form from './Components/Form';
import FilterButton from './Components/FilterButton';
import { useState } from 'react';
import {nanoid} from 'nanoid';

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks?.map((task) => (
  <Todo 
    id={task.id} 
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
  />
  ));
  
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? 'Задачи' : 'Задача';
  const headingText = `${taskList.length} ${tasksNoun} оставшиеся`
  
  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className='filters btn-group stack-exception'>
        <FilterButton name='Все'/>
        <FilterButton name='Активные'/>
        <FilterButton name='Завершенные'/>
      </div>
      <h2 id='list-heading'>{headingText}</h2>
      <ul role='list' className='todo-list stack-large stack-exception' aria-labelledby='list-heading'>
        {taskList}
      </ul>
    </div>
  );
}

export default App;