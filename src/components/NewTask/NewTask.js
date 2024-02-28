
import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const createTasks = (taskText,taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId,text:taskText};

    props.onAddTask(createdTask);
  };

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
 
  const enterTaskHandler=async(taskText)=>{
    sendTaskRequest({
      url: "https://custom-react-hooks-785d3-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body:{text:taskText},
      headers: { "Content-Type": "application/json" },
    },createTasks.bind(null,taskText))
    

  }

  // const enterTaskHandler = async (taskText) => {

  //   try {
  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };

  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || "Something went wrong!");
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
