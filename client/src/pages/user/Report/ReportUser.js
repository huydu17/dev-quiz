import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { getAllReports, getReportsByUser } from "../../../apicalls/report";
import { useSelector } from "react-redux";
import moment from "moment";

function ReportUser() {
  const [reports, setReports] = useState();
  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: "Bài thi",
      dataIndex: "examName",
      render: (text, record) => <>{record?.examName}</>,
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.date).format("HH:mm:ss DD/M/YYYY ")}</>
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
      const response = await getReportsByUser({ user: user._id });
      console.log(response);
      if (response.success) {
        const formatReports = response.data.map((report) => {
          return {
            examName: report.exam?.name,
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

export default ReportUser;
