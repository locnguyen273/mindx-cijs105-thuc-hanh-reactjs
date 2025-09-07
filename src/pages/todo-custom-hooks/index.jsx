import React, { useState, useCallback, useMemo } from "react";
import { Input, Button, List, Space, Typography, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TodoItem from "../../components/todo-custom-hooks/todo-item";

const { Title } = Typography;

const ToDoCustomHooks = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  // hàm create hoặc edit todo
  const handleAddOrEdit = useCallback(() => {
    if (!value.trim()) return;
    if (editing) {
      setTodos((prev) => prev.map((t) => (t.id === editing.id ? { ...t, text: value } : t)));
      setEditing(null);
    } else {
      setTodos((prev) => [...prev, { id: Date.now(), text: value }]);
    }
    setValue("");
  }, [value, editing]);

  // hàm chỉnh sửa từng todo
  const handleEdit = useCallback((todo) => {
    setValue(todo.text);
    setEditing(todo);
  }, []);

  const handleDelete = useCallback((id) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá?",
      onOk: () => setTodos((prev) => prev.filter((t) => t.id !== id)),
    });
  }, []);
  // hàm lọc todo theo từ khoá tìm kiếm
  const filteredTodos = useMemo(() => {
    return todos.filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [todos, search]);

  return (
    <div style={{ maxWidth: 500, margin: "50px auto" }}>
      <Title level={2}>Todo App Custom Hooks</Title>

      <Space.Compact style={{ width: "100%", marginBottom: 10 }}>
        <Input
          placeholder="Nhập todo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={handleAddOrEdit}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddOrEdit}>
          {editing ? "Cập nhật" : "Thêm"}
        </Button>
      </Space.Compact>

      <Input.Search
        placeholder="Tìm kiếm..." allowClear value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 20 }} />

      <List
        bordered dataSource={filteredTodos}
        renderItem={(todo) => (
          <TodoItem todo={todo} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      />
    </div>
  );
}

export default ToDoCustomHooks