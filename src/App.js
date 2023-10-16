import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const apiData = {
    url: 'https://react-http-af8a7-default-rtdb.firebaseio.com/tasks.json',
    method: 'GET',
    body: null,
    headers: '',
  };

  const taskData = (data) => {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const {
    isLoading,
    error,
    useConfig: fetchTasks,
  } = useHttp(apiData, taskData);

  const [tasks, setTasks] = useState([]);

  // const fetchTasks = async () => {
  // setIsLoading(true);
  // setError(null);
  // try {
  //   const response = await fetch(
  //     'https://react-http-af8a7-default-rtdb.firebaseio.com/tasks.json'
  //   );
  //   if (!response.ok) {
  //     throw new Error('Request failed!');
  //   }
  //   const data = await response.json();
  //   const loadedTasks = [];
  //   for (const taskKey in data) {
  //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //   }
  //   setTasks(loadedTasks);
  // } catch (err) {
  //   setError(err.message || 'Something went wrong!');
  // }
  // setIsLoading(false);
  // };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
