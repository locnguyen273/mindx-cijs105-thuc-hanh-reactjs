import React from "react";
import { Button, Form, Input, Modal } from "antd";

const Register = (props) => {
  const { formData, setFormData, isOpenModal, handleOk, handleCancel, handleCancelCreateUser, handleCreateUser } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      fullname: formData.fullname,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      location: formData.location,
    });
  }, [form, formData]);

  const handleValuesChange = (_, allValues) => {
    setFormData(allValues);
  };

  return (
    <div>
      <Modal
        title="Create New User"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnHidden
        footer={
          <div
            className="d-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}
          >
            <Button onClick={handleCancelCreateUser}>Cancel</Button>
            <Button type="primary" onClick={handleCreateUser}>
              Save
            </Button>
          </div>
        }
      >
        <Form form={form} onValuesChange={handleValuesChange} layout="vertical" autoComplete="off">
          <Form.Item label="Full Name" name="fullname">
            <Input placeholder="input fullname" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="input email" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber">
            <Input placeholder="input phone number" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password placeholder="input password" />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input placeholder="input location" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
