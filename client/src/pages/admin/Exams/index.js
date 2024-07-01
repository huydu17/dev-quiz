import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table, message } from "antd";
import { deleteExam, getAllExams } from "../../../apicalls/exam";

function Exam() {
  const navigate = useNavigate();
  const [exams, setExams] = useState();
  const getAllExam = async () => {
    try {
      const response = await getAllExams();
      console.log(response);
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  //delete exam
  const deleExam = async (id) => {
    try {
      const response = await deleteExam(id);
      if (response.success) {
        message.success(response.message);
        getAllExam();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    getAllExam();
  }, []);

  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "name",
    },
    {
      title: "Thời gian(phút)",
      dataIndex: "durations",
    },
    {
      title: "Số câu",
      dataIndex: "totalMarks",
    },
    {
      title: "Số câu yêu cầu",
      dataIndex: "passingMarks",
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            class="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            class="ri-delete-bin-line"
            onClick={() => deleExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between mb-2">
        <PageTitle title="Bài thi" />
        <button
          className="primary-outlined-btn flex item-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-circle-line"></i>Thêm bài thi
        </button>
      </div>
      <Table columns={columns} dataSource={exams} />
    </div>
  );
}

export default Exam;
