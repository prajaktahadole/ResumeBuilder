import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {feedbackKpidatamapper} from "./dataMappers";
//
// const columnDefs = [
//     { headerName: "Interviewer Name", field: "interviewerName" },
//     { headerName: "Selected", field: "Selected" },
//     { headerName: "Rejected", field: "Rejected" },
//     { headerName: "Hold", field: "Hold" },
//     { headerName: "Total", field: "Total" },
//   ];
//
//   export const exportToExcel = (data, filename) => {
//     const reorderedData = data.map((item) =>
//     columnDefs.reduce((obj, column) => {
//       obj[column.headerName] = item[column.field];
//       return obj;
//     }, {})
//   );
//
//   const worksheet = XLSX.utils.json_to_sheet(reorderedData);
//
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//   const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//   saveAs(blob, filename);
//   };

const columnDefs = [
    { headerName: "Interviewer Name", field: "interviewerName" },
    {
        headerName: "Selected",
        children: [
            { headerName: "Internal", field: "selectedInternal" },
            { headerName: "Converge", field: "selectedConverge" },
        ],
    },
    {
        headerName: "Rejected",
        children: [
            { headerName: "Internal", field: "rejectedInternal" },
            { headerName: "Converge", field: "rejectedConverge" },
        ],
    },
    {
        headerName: "Hold",
        children: [
            { headerName: "Internal", field: "holdInternal" },
            { headerName: "Converge", field: "holdConverge" },
        ],
    },
    {
        headerName: "Total",
        children: [
            { headerName: "Internal", field: "totalInternal" },
            { headerName: "Converge", field: "totalConverge" },
        ],
    },
];

export const exportToExcel = (data, filename) => {
    const tempArray = feedbackKpidatamapper(data);

    const reorderedData = tempArray.map((item) =>
        columnDefs.reduce((obj, column) => {
            if (column.children) {
                const subHeadersData = {};
                column.children.forEach((subHeader) => {
                    const subHeaderField = subHeader.field.substring(0, subHeader.field.length - 2); // Remove the last two characters (e.g., "Ho", "Re", etc.)
                    subHeadersData[subHeader.headerName] = item[subHeaderField + column.field]; // Combine subheader field with column field to get the correct data property
                });
                obj[column.headerName] = subHeadersData;
            } else {
                obj[column.headerName] = item[column.field];
            }
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
