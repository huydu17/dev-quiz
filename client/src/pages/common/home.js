import React, { useState, useEffect } from "react";
import { getAllExams } from "../../apicalls/exam";
import { Col, Row, message } from "antd";
import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [exams, setExams] = useState();
  const navigate = useNavigate();
  const getExams = async () => {
    try {
      const response = await getAllExams();
      console.log(response);
      if (response.success) {
        setExams(response.data);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    getExams();
  }, []);
  console.log("helloL:", user);
  return (
    <div className="mt-2">
      <PageTitle title={`Hãy nhấp vào bất kỳ bài thi nào để bắt đầu. `} />
      {exams && (
        <Row gutter={[16, 16]}>
          {exams.map((exam, index) => (
            <Col span={5} key={index}>
              <div className="card flex flex-col gap-1 p-1 mt-2">
                <h1 className="text-2xl">{exam.name}</h1>
                <span className="text-md">
                  Đề thi gồm <strong>{exam.totalMarks} câu</strong>
                </span>

                <span className="text-md">
                  Thời gian hoàn thành trong{" "}
                  <strong>{exam.durations} phút</strong>
                </span>
                <button
                  className="start-now-btn"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Bắt đầu ngay
                </button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
