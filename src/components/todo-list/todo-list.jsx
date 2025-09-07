import React, { useState, useEffect } from "react";

//create custom style
const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  inputGroup: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  addButton: {
    padding: "10px 20px",
    marginLeft: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  taskText: {
    flex: 1,
  },
  editButton: {
    marginRight: "10px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
  editInput: {
    padding: "8px",
    fontSize: "16px",
    flex: 1,
    marginRight: "10px",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Xử lí đông bộ data với storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (newTask.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTask.trim() }]);
    setNewTask("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSave = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button onClick={handleAdd} style={styles.addButton}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todos?.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            {editingId === todo.id ? (
              <React.Fragment>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={styles.editInput}
                />
                <button
                  onClick={() => handleSave(todo.id)}
                  style={styles.saveButton}
                >
                  Save
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span style={styles.taskText}>{todo.text}</span>
                <div>
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
