import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Input, Row, Select, Table, Tabs, message } from "antd";
import { addExam, getExamById, updateExam } from "../../../apicalls/exam";
import { useNavigate, useParams } from "react-router-dom";
import AddEditQuestion from "./AddEditQuestion";
import { deleteQuestion } from "../../../apicalls/question";
const { TabPane } = Tabs;

function AddEditExam() {
  const navigate = useNavigate();
  const params = useParams();
  const [exam, setExam] = useState();
  const [selectQuestion, setSelectQuestion] = useState([]);
  const [showAddEditQuestion, setShowAddEditQuestion] = useState(false);

  const getExam = async () => {
    if (params.id) {
      try {
        const response = await getExamById({ examId: params.id });
        console.log(response);
        if (response.success) {
          setExam(response.data);
        } else {
          message.error(response.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    }
  };

  const deleQuestion = async (id) => {
    try {
      const response = await deleteQuestion({
        question_id: id,
        exam: params.id,
      });
      console.log(params.id);
      console.log(response);
      if (response.success) {
        message.success(response.message);
        getExam();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  //columns table
  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "name",
    },
    {
      title: "Đáp án",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key, index) => {
          return (
            <div>
              {key} : {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Đáp án đúng",
      dataIndex: "correctOptions",
      render: (text, record) => {
        return `${record.correctOptions} : ${
          record.options[record.correctOptions]
        }`;
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            class="ri-pencil-line"
            onClick={() => {
              setShowAddEditQuestion(true);
              setSelectQuestion(record);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleQuestion(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (params.id) {
      getExam();
    }
  }, []);

  const onFinish = async (values) => {
    try {
      let response;
      if (params.id) {
        response = await updateExam(params.id, values);
      } else {
        response = await addExam(values);
      }
      console.log(response);
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <div>
      {params.id ? (
        <PageTitle title="Chỉnh sửa" />
      ) : (
        <PageTitle title="Thêm mới" />
      )}
      <div className="divider"></div>
      {(exam || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={exam}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={params.id ? "Chi tiết" : "Thông tin"} key="1">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item name="name" label="Tên bài thi">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="durations" label="Thời gian(phút)">
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="totalMarks" label="Số câu">
                    <Input type="number" min="0" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="passingMarks" label="Số câu đạt yêu cầu">
                    <Input type="number" min="0" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="cancel-exam-btn"
                  onClick={() => navigate("/admin/exams")}
                >
                  Trở về
                </button>
                <button type="submit" className="save-exam-btn">
                  Lưu
                </button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Câu hỏi" key="2">
                <div className="flex justify-between">
                  <div></div>
                  <button
                    className="add-question-btn flex item-center"
                    type="button"
                    onClick={() => {
                      setShowAddEditQuestion(true);
                      setSelectQuestion(null);
                    }}
                  >
                    <i className="ri-add-circle-line" />
                    Thêm câu hỏi
                  </button>
                </div>
                <Table columns={columns} dataSource={exam.questions} />
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}
      {showAddEditQuestion && (
        <AddEditQuestion
          setShowAddEditQuestion={setShowAddEditQuestion}
          showAddEditQuestion={showAddEditQuestion}
          exam={params.id}
          refreshData={getExam}
          selectQuestion={selectQuestion}
          setSelectQuestion={setSelectQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExam;
