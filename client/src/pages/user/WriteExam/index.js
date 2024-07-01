import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../apicalls/exam";
import { message } from "antd";
import Introduction from "./Introduction";
import { addReport } from "../../../apicalls/report";
import { useSelector } from "react-redux";

function WriteExam() {
  const params = useParams();
  const [exam, setExam] = useState();
  const [view, setView] = useState("instructions");
  const [result, setResult] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectQuestionIndex, setSelectQuestionIndex] = useState(0);
  const [selectOptions, setSelectOptions] = useState([]);
  const [secondLeft, setSecondLeft] = useState(0);
  const [minutes, setMinutes] = useState();
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  console.log("phút:", minutes);
  console.log("giây:", secondLeft);
  //get Exam
  const getExam = async () => {
    if (params.id) {
      try {
        const response = await getExamById({ examId: params.id });
        console.log(response);
        if (response.success) {
          setExam(response.data);
          setQuestions(response.data.questions);
          setMinutes(response.data.durations);
        } else {
          message.error(response.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    }
  };
  //Calculate
  const caculator = async () => {
    let correctAnswer = [];
    let incorrectAnswer = [];
    questions.forEach((question, index) => {
      if (question.correctOptions === selectOptions[index]) {
        correctAnswer.push(question);
      } else {
        incorrectAnswer.push(question);
      }
    });
    let verdict = "Đạt";
    if (correctAnswer.length < exam.passingMarks) {
      verdict = "Chưa đạt";
    }
    console.log("câu đúng", correctAnswer);
    console.log("câu cần vượt", exam.passingMarks);

    const results = { correctAnswer, incorrectAnswer, verdict };
    setResult(results);
    const response = await addReport({
      user: user._id,
      result: results,
      exam: params.id,
    });
    if (response.success) {
      setView("result");
    } else {
      message.error(response.message);
    }
  };
  //start timer
  const startTimer = () => {
    let seconds = exam.durations * 60;
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        setSecondLeft(seconds % 60);
        setMinutes(Math.floor(seconds / 60));
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };
  useEffect(() => {
    getExam();
  }, []);
  useEffect(() => {
    if (timeUp && view === "exam") {
      clearInterval(intervalId);
      caculator();
    }
  }, [timeUp]);
  return (
    <div>
      <div className="divider"></div>
      <div className="text-center">
        <h1 style={{ color: "var(--primary)" }}>{exam?.name}</h1>
      </div>
      <div className="divider"></div>
      {view === "instructions" && (
        <Introduction
          exam={exam}
          view={view}
          setView={setView}
          startTimer={startTimer}
        />
      )}
      {view === "exam" && (
        <div className="flex flex-col gap-2 pt-2">
          <div className="flex justify-between">
            <h1 className="text-2xl">
              {selectQuestionIndex + 1}. {questions[selectQuestionIndex]?.name}{" "}
            </h1>
            <div className="timer">
              <span className="text-2xl">
                {minutes}:{secondLeft < 10 ? "0" : ""}
                {secondLeft}
              </span>
            </div>
          </div>
          {Object.keys(questions[selectQuestionIndex]?.options).map(
            (option, index) => {
              return (
                <p
                  className={
                    // a[0]= B
                    selectOptions[selectQuestionIndex] === option
                      ? "select-options"
                      : "options"
                  }
                  key={index}
                  //ở đây khi click chọn thì sẽ lưu vào 1 object 0:A, 1:B
                  onClick={() => {
                    setSelectOptions({
                      ...selectOptions,
                      [selectQuestionIndex]: option,
                    });
                  }}
                >
                  {option}. {questions[selectQuestionIndex].options[option]}
                </p>
              );
            }
          )}
          <div className="flex justify-between">
            {selectQuestionIndex > 0 && (
              <button
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  color: "var(--primary-color",
                }}
                onClick={() => {
                  setSelectQuestionIndex(selectQuestionIndex - 1);
                }}
              >
                Quay lại
              </button>
            )}

            {selectQuestionIndex < questions?.length - 1 && (
              <button
                className="primary-container-btn"
                onClick={() => {
                  setSelectQuestionIndex(selectQuestionIndex + 1);
                }}
              >
                Tiếp theo
              </button>
            )}
            {selectQuestionIndex === questions?.length - 1 && (
              <button
                className="primary-container-btn"
                onClick={() => {
                  clearInterval(intervalId);
                  setTimeUp(true);
                }}
              >
                Nộp bài
              </button>
            )}
          </div>
        </div>
      )}
      {view === "result" && (
        <div className="flex flex-col gap-3 pt-2 item-center result-box">
          <div className="result">
            <div>
              <h1 className="text-2xl ">Hoàn thành bài thi !</h1>
              <div
                className="flex flex-col gap-1"
                style={{ paddingTop: "15px" }}
              >
                <p>
                  Kết quả đạt được:{" "}
                  {(
                    result.correctAnswer.length *
                    (10 / exam.questions.length)
                  ).toFixed(2)}{" "}
                  điểm
                </p>
                <p>Số câu đúng : {result.correctAnswer.length}</p>
                <p>Số câu sai : {result.incorrectAnswer.length}</p>
                <p>Trạng thái : {result.verdict}</p>
              </div>
            </div>
            <div className="flex gap-2" style={{ paddingTop: "25px" }}>
              <button
                style={{
                  border: "2px solid var(--primary)",
                  padding: "0px 20px",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  setView("instructions");
                  setSelectQuestionIndex(0);
                  setSelectOptions({});
                  setSecondLeft(exam.durations);
                  setTimeUp(false);
                }}
              >
                Làm lại
              </button>
              <button
                className="save-exam-btn"
                onClick={() => {
                  setView("answer");
                }}
              >
                Đáp án
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "answer" && (
        <div className="flex flex-col gap-2">
          {questions.map((question, index) => {
            const iscorrect = question.correctOptions === selectOptions[index];
            return (
              <div
                key={index}
                className={`flex flex-col gap-1  p-2 card ${
                  iscorrect ? "bg-success" : "bg-error"
                }`}
              >
                <h1 className="text-2xl">
                  {index + 1}. {question.name}
                </h1>
                <p className="text-md">
                  {selectOptions[index]
                    ? `Đáp án của bạn: ${selectOptions[index]}-
                ${question.options[selectOptions[index]]}`
                    : " Đáp án của bạn: x"}
                </p>
                <p className="text-md">
                  Đáp áp đúng:{question.correctOptions} -{" "}
                  {question.options[question.correctOptions]}
                </p>
              </div>
            );
          })}
          <div className="flex justify-center gap-2">
            <button
              style={{
                border: "2px solid var(--primary)",
                padding: "0px 20px",
                borderRadius: "5px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Thoát
            </button>
            <button
              className="save-exam-btn"
              onClick={() => {
                setView("instructions");
                setSelectQuestionIndex(0);
                setSelectOptions({});
                setSecondLeft(exam.durations);
                setTimeUp(false);
              }}
            >
              Làm lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteExam;
