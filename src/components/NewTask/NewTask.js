import React from 'react';
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  console.log('props', props);

  const enterTaskHandler = async (taskText, data) => {
    const getTasks = () => {
      // console.log('taskText___', taskText);
      // console.log('data___', data);

      const generatedId = data.name;
      // firebase에서만 해당하는 부분 => "name"은 생성된 id
      const createdTask = { id: generatedId, text: data.taskText };
      props.onAddTask(createdTask);

      console.log('generatedId__', generatedId);
    };

    const reqConfig = {
      url: 'https://react-http-af8a7-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      body: { text: taskText },
      headers: { 'Content-Type': 'application/json' },
    };

    callHttp(getTasks, reqConfig);

    console.log('taskText', taskText);
  };

  const { isLoading, error, callHttp } = useHttp();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const enterTaskHandler = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       'https://react-http-af8a7-default-rtdb.firebaseio.com/tasks.json',
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name; // firebase에서만 해당하는 부분 => "name"은 생성된 id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  // };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
