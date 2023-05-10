import { Close as IconClose } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import * as React from "react";

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <IconClose sx={{ color: "white" }} />
    </IconButton>
  );
}

export default SnackbarCloseButton;
