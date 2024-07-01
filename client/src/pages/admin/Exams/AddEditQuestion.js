import { Form, Modal, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addQuestion, editQuestion } from "../../../apicalls/question";

function AddEditQuestion({
  setShowAddEditQuestion,
  showAddEditQuestion,
  exam,
  refreshData,
  selectQuestion,
  setSelectQuestion,
}) {
  const onFinish = async (values) => {
    const question = {
      name: values.name,
      correctOptions: values.correctOptions,
      options: {
        A: values.A,
        B: values.B,
        C: values.C,
        D: values.D,
      },
      exam: exam,
    };
    try {
      let response;
      console.log("SelectQues", selectQuestion);
      if (selectQuestion) {
        response = await editQuestion({
          ...question,
          question_id: selectQuestion._id,
        });
      } else {
        response = await addQuestion(question);
      }
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestion(false);
      } else {
        console.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <Modal
      title={selectQuestion ? "Chỉnh sửa" : "Thêm mới"}
      visible={showAddEditQuestion}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestion(false);
        setSelectQuestion(null);
      }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: selectQuestion?.name,
          correctOptions: selectQuestion?.correctOptions,
          A: selectQuestion?.options?.A,
          B: selectQuestion?.options?.B,
          C: selectQuestion?.options?.C,
          D: selectQuestion?.options?.D,
        }}
      >
        <Form.Item name="name" label="Câu hỏi">
          <input />
        </Form.Item>

        <div className="flex-form item-center">
          <Form.Item name="A" label="Đáp A" className="input-correct">
            <input />
          </Form.Item>
          <Form.Item name="B" label="Đáp B" className="input-correct">
            <input />
          </Form.Item>
        </div>

        <div className="flex-form item-center">
          <Form.Item name="C" label="Đáp C" className="input-correct">
            <input />
          </Form.Item>
          <Form.Item name="D" label="Đáp D" className="input-correct">
            <input />
          </Form.Item>
        </div>
        <Form.Item name="correctOptions" label="Đáp án đúng">
          <input />
        </Form.Item>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="cancel-exam-btn"
            onClick={() => {
              setShowAddEditQuestion(false);
              setSelectQuestion(null);
            }}
          >
            Huỷ
          </button>
          <button type="submit" className="save-exam-btn">
            Lưu
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
