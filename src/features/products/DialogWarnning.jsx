import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Button,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
const DialogWarnning = ({ openDialog, handleChangeDialog }) => {
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => handleChangeDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
            marginTop: 5,
          }}
        >
          <WarningIcon color="warning" sx={{ fontSize: 100 }} />
        </Box>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
            fontSize: 25,
          }}
        >
          {"ไฟล์ที่อัปโหลดไม่ใช่รูปภาพ"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            โปรดตรวจสอบประเภทไฟล์ที่อัปโหลดว่าใช่รูปภาพหรือไม่
          </DialogContentText>
        </DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <DialogActions>
            <Button
              onClick={() => handleChangeDialog(false)}
              sx={{ fontSize: 20 }}
            >
              ปิด
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default DialogWarnning;
