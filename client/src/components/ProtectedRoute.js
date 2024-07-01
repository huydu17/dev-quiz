import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/user";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [collapse, setCollapse] = useState(false);

  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      console.log(response);
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        navigate("/login");
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const userMenu = [
    {
      title: "Trang chủ",
      paths: ["/", "/user/write-exam/"],
      icon: <i class="ri-home-line"></i>,
      onclick: () => navigate("/"),
    },
    {
      title: "Thông kế",
      paths: ["/user/reports"],
      icon: <i class="ri-bar-chart-line"></i>,
      onclick: () => navigate("/user/reports"),
    },
    {
      title: "Đăng xuất",
      paths: ["/logout"],
      icon: <i class="ri-logout-box-line"></i>,
      onclick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const adminMenu = [
    {
      title: "Trang chủ",
      paths: ["/", "/user/write-exam/"],
      icon: <i class="ri-home-line"></i>,
      onclick: () => navigate("/"),
    },
    {
      title: "Bài thi    ",
      paths: ["/admin/exams", "/admin/exams/add"],
      icon: <i class="ri-file-list-line"></i>,
      onclick: () => navigate("/admin/exams"),
    },
    {
      title: "Thông kê",
      paths: ["/admin/reports"],
      icon: <i class="ri-bar-chart-line"></i>,
      onclick: () => navigate("/admin/reports"),
    },
    {
      title: "Đăng xuất",
      paths: ["/logout"],
      icon: <i class="ri-logout-box-line"></i>,
      onclick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const activeRoute = window.location.pathname;
  const getisActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/admin/exams/edit") &&
        paths.includes("/admin/exams")
      ) {
        return true;
      }
      if (
        activeRoute.includes("/user/write-exam/") &&
        paths.includes("/user/write-exam/")
      ) {
        return true;
      }
    }
    return false;
  };
  console.log("Active", getisActiveOrNot);
  return (
    <div className="layout">
      <div className="flex gap-2 h-full h-100">
        <div className="sidebar text-2xl text-white">
          <div className="menu">
            {menu.map((menu, index) => {
              return (
                <div
                  className={`menu-item ${
                    getisActiveOrNot(menu.paths) && "active-menu-item"
                  }`}
                  key={index}
                  onClick={menu.onclick}
                >
                  {menu.icon}
                  {!collapse && <span>{menu.title}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header text-white flex justify-between ">
            {!collapse && (
              <i
                class="ri-close-line"
                onClick={() => {
                  setCollapse(true);
                }}
              ></i>
            )}
            {collapse && (
              <i
                class="ri-menu-line"
                onClick={() => {
                  setCollapse(false);
                }}
              ></i>
            )}
            <span className="text-2xl">Dev Quiz</span>
            <div>
              <div className="flex gap-1">
                <p className="text-md underline">{user && user.userName}</p>
              </div>
              <span className="text-md ">
                {user?.isAdmin ? "Admin" : "Người dùng"}
              </span>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}
export default ProtectedRoute;
