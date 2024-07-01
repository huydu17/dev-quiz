import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../apicalls/user";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <div class="flex justify-center item-center h-screen w-screen bg-account">
      <div className="card w-400 p-3 bg-form">
        <div className="flex flex-col">
          <h1 className="text-2xl">Đăng ký</h1>
        </div>
        <div className="divider"></div>
        <Form layout="vertical" className="mt-2" onFinish={onFinish}>
          <Form.Item name="userName" label="Họ tên">
            <input type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input type="text" />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <input type="password" />
          </Form.Item>
          <div className="flex flex-col gap-2">
            <button className="primary-container-btn mt-2 w-100" type="submit">
              Đăng ký
            </button>
            <Link to="/login">Đã có tài khoản? Đăng nhập ngay</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
