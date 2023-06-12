export const columnDefsResume = [
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    width: 150,
    unSortIcon: true,
    flex: 2
  },
  {
    headerName: "Designation",
    field: "designation",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    unSortIcon: true,
    width: 110,
    flex:2
  },
  {
    headerName: "Skills",
    field: "skills",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    unSortIcon: true,
    width: 110,
    flex:2
  },
  {
    headerName: "Created By",
    field: "createdBy",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    unSortIcon: true,
    width: 110,
    flex: 1.6,
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
    flex: 0.9
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
    headerName: "Candidate Id",
    field: "candidateId",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    flex: 1.5
  },
  {
    headerName: "Candidate",
    field: "candidate",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    flex: 1.6
  },
  {
    headerName: "Interview Type",
    field: "interviewType",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    unSortIcon: true,
    filter: true,
    width: 110,
    flex: 1.3
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
    flex: 1.2,
    cellStyle: function(params) {
      var status = params.value;
      if (status === 'SELECTED') {
        return { color: 'green'};
      } else if (status === 'REJECTED') {
        return { color: 'red' };
      } else if (status === 'HOLD') {
        return { color: 'orange' };
      }
      return null;
    }
  },
  {
    headerName: "Submitted Date",
    field: "submittedDate",
    sortable: true,
    sortingOrder: ["desc","asc"],
    filter: true,
    unSortIcon: true,
    width: 150,
    //sort: "desc",
    flex: 1.5,
    cellStyle: {textAlign: "center"}
  }, 
  {
    headerName: "View",
    cellRenderer: "buttonRendererViewResume",
    cellStyle: {textAlign: "center"},
    flex : 0.8
  },
  {
    headerName: "Share",
    cellRenderer: "buttonRendererShareResume",
    cellStyle: {textAlign: "center"},
    flex : 0.8
  },
  {
    headerName: "Delete",
    cellRenderer: "buttonRendererDeleteResume",
    cellStyle: {textAlign: "center"},
    flex : 0.8
  },
];
export const columnDefsFeedbackKpi = [
  {
    headerName: "Interviewer",
    cellStyle: {textAlign: 'center'},
    children: [
      {
        headerName: "Name",
        field: "interviewer",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: true,
        width: 110,
        flex: 1.5
      }
    ]
  },

  {
    headerName: "Selected",
    headerClass: "ag-header-center",
    children: [
      {
        headerName: "Internal",
        field: "internalSe",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: { color: "green", fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
      {
        headerName: "Converge",
        field: "convergeSe",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: { color: "green", fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
    ],
  },

  {
    headerName: "Rejected",
    headerClass: "ag-header-center",
    children: [
      {
        headerName: "Internal",
        field: "internalRe",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: { color: "red", fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
      {
        headerName: "Converge",
        field: "convergeRe",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: { color: "red", fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
    ],
  },

  {
    headerName: "Hold",
    headerClass: "ag-header-center",
    children: [
      {
        headerName: "Internal",
        field: "internalHo",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: { color: "orange", fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
      {
        headerName: "Converge",
        field: "convergeHo",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: { color: "orange", fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
    ],
  },

  {
    headerName: "Total",
    headerClass: "ag-header-center",
    children: [
      {
        headerName: "Internal",
        field: "internalTo",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: {  fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
      {
        headerName: "Converge",
        field: "convergeTo",
        sortingOrder: ["asc", "desc"],
        sortable: true,
        unSortIcon: true,
        filter: false,
        width: 110,
        cellStyle: { fontWeight: "bold", fontSize: "16px", textAlign: "center" },
      },
    ],
    cellStyle: {  fontWeight: "bold", fontSize: "16px", textAlign: "center" },
  },
];