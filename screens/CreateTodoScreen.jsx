import storage from "../lib/storage";
import TodoForm from "../components/TodoForm";
import { useTodosStore } from "../store/todoStore";

function CreateTodoScreen({ navigation }) {
  const addTodoFromStore = useTodosStore((state) => state.addTodo);
  const handleAddTodo = async (label) => {
    addTodoFromStore(label);
    navigation.goBack();
  };
  return <TodoForm submitLabel="Ajouter la tâche" onSubmit={handleAddTodo} />;
}

export default CreateTodoScreen;
