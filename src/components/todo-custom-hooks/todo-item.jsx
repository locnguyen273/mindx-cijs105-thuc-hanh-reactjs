
import React from 'react';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TodoItem = React.memo(({ todo, onEdit, onDelete }) => {
  return (
    <List.Item
      actions={[
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(todo)} />,
        <Button danger type="link" icon={<DeleteOutlined />} onClick={() => onDelete(todo.id)} />,
      ]}
    >
      {todo.text}
    </List.Item>
  );
});

export default TodoItem;