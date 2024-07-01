import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Divider, Table, message } from "antd";
import { getAllReports } from "../../../apicalls/report";
import moment from "moment";

function Report() {
  const [reports, setReports] = useState();
  console.log(reports);
  const columns = [
    {
      title: "Bài thi",
      dataIndex: "examName",
      render: (text, record) => <>{record?.examName}</>,
    },
    {
      title: "Người thi",
      dataIndex: "userName",
      render: (text, record) => <>{record?.userName}</>,
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.date).format("DD/M/YYYY HH:mm:ss")}</>
      ),
    },
    {
      title: "Số câu hỏi",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record?.totalQuestions?.length}</>,
    },
    {
      title: "Số câu đúng",
      dataIndex: "correctQuestion",
      render: (text, record) => <>{record?.correctQuestion?.length}</>,
    },
    {
      title: "Kết quả",
      dataIndex: "action",
      render: (text, record) => <>{record.action}</>,
    },
  ];
  const getReports = async () => {
    try {
      const response = await getAllReports();
      console.log(response);
      if (response.success) {
        const formatReports = response.data.map((report) => {
          return {
            examName: report.exam?.name,
            userName: report.user?.userName,
            date: report.createdAt,
            totalQuestions: report.exam?.questions,
            correctQuestion: report.result?.correctAnswer,
            action: report.result?.verdict,
          };
        });
        setReports(formatReports);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    getReports();
  }, []);
  return (
    <div>
      <PageTitle title={"Thống kê"} />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reports} />
    </div>
  );
}

export default Report;
