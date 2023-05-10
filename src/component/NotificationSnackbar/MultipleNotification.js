import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import SnackbarCloseButton from "./SnackbarcloseButton";
import { setMultiNotificationData } from "../../reduxToolkit/Notification/notificationSlice";
function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  const { multiNotificationData: arr, multiNotificationVariant } = useSelector(
    (state) => state.notification
  );
  React.useEffect(() => {
    arr &&
      Array.isArray(arr) &&
      arr.length &&
      arr.map((ele) => {
        enqueueSnackbar(ele.propertyValue, {
          variant: `${multiNotificationVariant}`,
        });
      });
  }, [arr]);

  return <></>;
}

export default function MultiNotification() {
  const dispatch = useDispatch();
  const { verticalPosition, horizontalPosition } = useSelector(
    (state) => state.notification
  );
  return (
    <SnackbarProvider
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
      onClose={() => dispatch(setMultiNotificationData([]))}
      autoHideDuration={1000}
      anchorOrigin={{
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      }}
      maxSnack={5}
    >
      <MyApp />
    </SnackbarProvider>
  );
}
