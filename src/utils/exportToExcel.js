import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const columnDefs = [
    { headerName: "Interviewer Name", field: "interviewerName" },
    { headerName: "Selected", field: "Selected" },
    { headerName: "Rejected", field: "Rejected" },
    { headerName: "Hold", field: "Hold" },
    { headerName: "Total", field: "Total" },
  ];
  
  export const exportToExcel = (data, filename) => {
    const reorderedData = data.map((item) =>
    columnDefs.reduce((obj, column) => {
      obj[column.headerName] = item[column.field];
      return obj;
    }, {})
  );

  const worksheet = XLSX.utils.json_to_sheet(reorderedData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, filename);
  };