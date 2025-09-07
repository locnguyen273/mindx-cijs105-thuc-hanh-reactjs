import React, { useState, useEffect } from "react";
import { Button, Modal, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Register from "./register";
import ViewDetail from "./view-detail";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";
import { fetchAllUsers } from "../../stores/userReducer";

const ListUsers = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModal, setIsOpenModal] = useState();
  const [isOpenModalView, setIsOpenModalView] = useState();
  const [isDisplaySpinner, setIsDisplaySpinner] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    location: "",
  });
  const users = useSelector(state => state.users.userList);
  const userStatus = useSelector(state => state.users.status);
  const [userDetail, setUserDetail] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [userStatus, dispatch]);

  if (userStatus === 'loading') {
    return <div>Loading posts...</div>;
  }

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setFormData({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      location: "",
    });
    setIsOpenModal(false);
  };

  const handleCancelCreateUser = () => {
    setIsOpenModal(false);
    setFormData({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      location: "",
    });
  };

  const handleCreateUser = async () => {
    try {
      setIsDisplaySpinner(true);
      const result = await axios.post(
        "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=68a1c6779f3bbb05c6342994",
        formData
      );
      if (result.status === 201) {
        setIsOpenModal(false);
        setFormData({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          location: "",
        });
        dispatch(fetchAllUsers());
        messageApi.open({
          type: "success",
          content: result.data?.message ?? "Create successful",
        });
        setIsDisplaySpinner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      setIsDisplaySpinner(true);
      const result = await axios.put(
        `https://mindx-mockup-server.vercel.app/api/resources/users/${userId}?apiKey=68a1c6779f3bbb05c6342994`,
        userDetail
      );
      if (result.status === 200) {
        setIsOpenModalView(false);
        dispatch(fetchAllUsers());
        messageApi.open({
          type: "success",
          content: result.data?.message ?? "Update user successful",
        });
        setIsDisplaySpinner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setIsDisplaySpinner(true);
      const result = await axios.delete(
        `https://mindx-mockup-server.vercel.app/api/resources/users/${id}?apiKey=68a1c6779f3bbb05c6342994`
      );

      if (result.status === 200) {
        message.open({
          type: "success",
          content: result?.data?.message ?? "Deleted user successful",
        });
        dispatch(fetchAllUsers());
        setIsDisplaySpinner(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOkUserDetail = () => {
    setIsOpenModalView(false);
  };

  const handleCancelUserDetail = () => {
    setIsOpenModalView(false);
  };

  const handleViewUserDetail = (id) => {
    setIsOpenModalView(true);
    const user = users.find((item) => item._id === id);
    setUserId(user._id);
    setUserDetail(user);
  };

  return (
    <div className="lesson-seven">
      {contextHolder}
      {isDisplaySpinner ? (
        <div className="had-spinner">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <div>
          <div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ maxWidth: "80%", margin: "auto" }}
            >
              <h1>List User</h1>
              <Button onClick={() => showModal()}>Add new user</Button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Location</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.fullname}</td>
                        <td>{item?.email}</td>
                        <td>{item?.phoneNumber}</td>
                        <td>{item?.location}</td>
                        <td>
                          <div>
                            <Button
                              onClick={() => handleViewUserDetail(item._id)}
                            >
                              View Detail
                            </Button>
                            <Button onClick={() => handleDeleteUser(item._id)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isOpenModal && (
            <Register
              formData={formData}
              setFormData={setFormData}
              isOpenModal={isOpenModal}
              handleOk={handleOk}
              handleCancel={handleCancel}
              handleCancelCreateUser={handleCancelCreateUser}
              handleCreateUser={handleCreateUser}
            />
          )}

          {isOpenModalView && (
            <ViewDetail
              userDetail={userDetail}
              setUserDetail={setUserDetail}
              isOpenModalView={isOpenModalView}
              handleOkUserDetail={handleOkUserDetail}
              handleCancelUserDetail={handleCancelUserDetail}
              handleCancelCreateUser={handleCancelCreateUser}
              handleUpdateUser={handleUpdateUser}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ListUsers;
