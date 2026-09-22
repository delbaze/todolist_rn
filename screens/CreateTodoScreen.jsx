import storage from "../lib/storage";
import TodoForm from "../components/TodoForm";

function CreateTodoScreen({ navigation }) {
  const handleAddTodo = async (label) => {
    const newTodo = { id: Date.now().toString(), label, done: false };
    const todos = await storage.load({ key: "todoslist", defaultValue: [] });
    const updatedTodos = [...todos, newTodo];
    storage.save({ key: "todoslist", data: updatedTodos });
    navigation.goBack();
  };
  return <TodoForm submitLabel="Ajouter la tâche" onSubmit={handleAddTodo} />;
}

export default CreateTodoScreen;
