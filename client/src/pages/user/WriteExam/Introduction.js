import React from "react";
import { useNavigate } from "react-router-dom";

function Introduction({ exam, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col item-center">
      {exam && (
        <ul className="flex flex-col gap-1">
          <h2
            style={{
              color: "var(--primary)",
              textDecoration: "underline",
            }}
          >
            Giới thiệu về bài thi
          </h2>
          <li>
            Bài thi phải được hoàn thành trong{" "}
            <strong>{exam.durations} phút</strong>.
          </li>
          <li>
            Bài thi sẽ được tự động nộp sau{" "}
            <strong>{exam.durations} phút</strong>.
          </li>
          <li>Một khi đã nộp, bạn không thể thay đổi câu trả lời.</li>
          <li>Không được làm mới trang web.</li>
          <li>
            Đề thi sẽ có <strong>{exam.questions.length} câu</strong>
          </li>
          <li>
            Số cầu đúng yêu cầu tối thiểu là{" "}
            <strong> {exam.passingMarks} câu.</strong>
          </li>
        </ul>
      )}
      <div className="flex gap-2 p-1">
        <button className="primary-outlined-btn" onClick={() => navigate("/")}>
          Trở về
        </button>
        <button
          className="primary-outlined-btn"
          style={{ backgroundColor: "var(--primary)", color: "white" }}
          onClick={() => {
            startTimer();
            setView("exam");
          }}
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
}

export default Introduction;
