import React from "react";
import { Form, Input, Modal, Button } from "antd";

const ViewDetail = (props) => {
  const {
    userDetail,
    setUserDetail,
    isOpenModalView,
    handleOkUserDetail,
    handleCancelUserDetail,
    handleCancelCreateUser,
    handleUpdateUser,
  } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      fullname: userDetail.fullname,
      email: userDetail.email,
      phoneNumber: userDetail.phoneNumber,
      password: userDetail.password,
      location: userDetail.location,
    });
  }, [form, userDetail]);

  const handleValuesChange = (_, allValues) => {
    setUserDetail(allValues);
  };

  return (
    <div>
      <Modal
        title="User Detail"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpenModalView}
        onOk={handleOkUserDetail}
        onCancel={handleCancelUserDetail}
        destroyOnHidden
        footer={
          <div
            className="d-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}
          >
            <Button onClick={handleCancelCreateUser}>Cancel</Button>
            <Button type="primary" onClick={handleUpdateUser}>
              Save
            </Button>
          </div>
        }
      >
        {userDetail ? (
          <Form form={form} layout="vertical" autoComplete="off" onValuesChange={handleValuesChange}>
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
        ) : (
          <p>Loading user data...</p>
        )}
      </Modal>
    </div>
  );
};

export default ViewDetail;
