export const columnDefsResume = [
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    width: 150,
    unSortIcon: true,
    flex: 1.5
  },
  {
    headerName: "Email",
    field: "email",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    flex: 2.5,
    unSortIcon: true,
    width: 110,
  },
  {
    headerName: "Designation",
    field: "designation",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    unSortIcon: true,
    width: 110,
    flex:1.5
  },
  {
    headerName: "Skills",
    field: "skills",
    sortable: false,
    filter: true,
    width: 110,
    flex:2
  },
  {
    headerName: "View",
    cellRenderer: "buttonRendererViewResume",
    cellStyle: {textAlign: "center"},
    flex:0.7
  },
  {
    headerName: "Download",
    cellRenderer: "buttonRendererDownloadResume",
    cellStyle: {textAlign: "center"},
    flex: 1
  },
  {
    headerName: "Share",
    cellRenderer: "buttonRendererShareResume",
    cellStyle: {textAlign: "center"},
    flex: 0.7
  },
  {
    headerName: "Delete",
    cellRenderer: "buttonRendererDeleteResume",
    cellStyle: {textAlign: "center"},
    flex: 0.9
  },
];

export const columnDefsUser = [
  {
    headerName: "Name",
    field: "name",
    unSortIcon: true,
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    width: 150,
    flex: 1.3
  },
  {
    headerName: "Email",
    field: "email",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    flex: 2
  },
  {
    headerName: "Role",
    field: "role",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    cellStyle: {textAlign: "center"}
  },
  {
    headerName: "Status",
    field: "status",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    cellStyle: {textAlign: "center"}
  },

  {
    headerName: "View",
    cellRenderer: "buttonRendererViewResume",
    cellStyle: {textAlign: "center"}
  },
  {
    headerName: "Delete",
    cellRenderer: "buttonRendererDeleteResume",
    cellStyle: {textAlign: "center"}
  },
];

export const columnDefsFeedback = [
  {
    headerName: "Candidate",
    field: "candidate",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    flex: 1.3
  },
  {
    headerName: "Interview Type",
    field: "interviewType",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    flex: 1.6
  },
  {
    headerName: "Round",
    field: "interviewRound",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    cellStyle: {textAlign: "center"},
    flex: 1.1
  },
  {
    headerName: "Interviewer",
    field: "interviewer",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    unSortIcon: true,
    width: 150,
    flex: 1.5
  },
  {
    headerName: "Status",
    field: "status",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    unSortIcon: true,
    width: 150,
    flex: 1.2
  },
  {
    headerName: "Submitted Date",
    field: "submittedDate",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    unSortIcon: true,
    width: 150,
    sort: "desc",
    flex: 1.7,
    cellStyle: {textAlign: "center"}
  }, 
  {
    headerName: "View",
    cellRenderer: "buttonRendererViewResume",
    cellStyle: {textAlign: "center"},
    flex : 0.7
  },
  {
    headerName: "Share",
    cellRenderer: "buttonRendererShareResume",
    cellStyle: {textAlign: "center"},
    flex : 0.7
  },
  {
    headerName: "Delete",
    cellRenderer: "buttonRendererDeleteResume",
    cellStyle: {textAlign: "center"},
    flex : 0.7
  },
];
export const columnDefsFeedbackKpi = [
  {
    headerName: "Interviewer",
    field: "interviewer",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
  },
  {
    headerName: "Selected",
    field: "selected",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    cellStyle: { color: "green", fontWeight: "bold", fontSize: "16px",textAlign: "center" },
  },
  {
    headerName: "Rejected",
    field: "rejected",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    cellStyle: { color: "red", fontWeight: "bold", fontSize: "16px",textAlign: "center" },
  },
  {
    headerName: "Hold",
    field: "hold",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    unSortIcon: true,
    width: 150,
    cellStyle: { color: "orange", fontWeight: "bold", fontSize: "16px",textAlign: "center" },
  },
  {
    headerName: "Total",
    field: "total",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    unSortIcon: true,
    width: 150,
    cellStyle: {fontWeight: "bold", fontSize: "16px",textAlign: "center"}
  },
];