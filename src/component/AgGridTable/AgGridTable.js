import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AGGridTable.css";
import {
  resumedatamapper,
  usersdatamapper,
  feedbackdatamapper,
  feedbackKpidatamapper,
} from "../../utils/dataMappers";
import {Button, IconButton} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const AgGridTable = ({
  data = [],
  gridOptions = [],
  type = "resume",
  searchData = "",
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);
 
  useEffect(() => {
    if (type === "resume") {
      setRowData(resumedatamapper(data));
    } else if (type === "users") {
      setRowData(usersdatamapper(data));
    } else if (type === "feedback") {
      setRowData(feedbackdatamapper(data));
    } else if (type === "interview") {
      setRowData(feedbackKpidatamapper(data));
    }
  }, [data, type]);
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const exportData = () => {
    if (type === "interview" && gridApi) {
      const currentDateTime = new Date().toISOString().replace(/[-:.]/g, "");
      const fileName = `interview_data_${currentDateTime}.csv`;
      const params = {
        fileName: fileName,
      };
      gridApi.exportDataAsCsv(params);
    }
  };

  const onFilterTextChange = (value) => {
    if (gridApi) {
      gridApi.setQuickFilter(value);
    }
  };
  const defaultColDef = {
    resizable: true,
    flex: 1,
    //sort: "desc",
  };

  useEffect(() => {
    onFilterTextChange(searchData.trim());
  }, [searchData]);

  return (
    <div style={{ width: "100%", height: "500px"}}>
      <div className="downloadButton">
        {type === "interview" && (
            <Button
                style={{
                  width: "10%",
                  padding: "10px",
                  fontSize: "10px",
                  fontWeight: "bolder",
                  backgroundColor: "rgb(33, 80, 162)",
                  textTransform: "none",
                  //marginLeft: "10px",
                }}
                variant="contained"
                onClick={exportData}
            >
              Export CSV
              {/*<IconButton color="primary" size="medium">*/}
              {/*  <CloudDownloadIcon />*/}
              {/*</IconButton>*/}
            </Button>
        )}
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "102%", width: "100%", overflowX: 'hidden', margin: "auto" }}
      >
    {rowData.length === 0 ? (
      <AgGridReact
      defaultColDef={defaultColDef}
      rowData={[]}
      onGridReady={onGridReady}
      // columnDefs={columnDefs}
      pagination={true}
      paginationPageSize={10}
      gridOptions={gridOptions}
      noRowsOverlayComponent={"customNoRowsOverlay"}
    />
      // 
    ) : (
      <AgGridReact
      defaultColDef={defaultColDef}
      rowData={rowData}
      onGridReady={onGridReady}
      // columnDefs={columnDefs}
      pagination={true}
      paginationPageSize={10}
      gridOptions={gridOptions}
      noRowsOverlayComponent={"customNoRowsOverlay"}
    />
    )}
      </div>
    </div>
  );
};

export default AgGridTable;


