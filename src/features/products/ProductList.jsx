import React, { useCallback } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { Box, Paper, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteProduct } from "./productSlice";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import { useNavigate } from "react-router-dom";

import { Button, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <div>
        <GridToolbar />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="ค้นหา..."
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const DeleteDialog = ({ open, handleClickOpen, deleteProductById }) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClickOpen(false)}
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
        <NotListedLocationIcon color="warning" sx={{ fontSize: 100 }} />
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
        {"ต้องการลบสินค้าใช่หรือไม่"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          โปรดตรวจความเเน่ใจว่าต้องการลบข้อมูลสินค้า
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClickOpen(false)}>ยกเลิก</Button>
        <Button onClick={deleteProductById}>ตกลง</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function ProductList() {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (status) => {
    setOpen(status);
  };

  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  React.useEffect(() => {
    initFetch();
  }, [initFetch]);

  const [deleteId, setDeleteId] = React.useState(null);

  const columns = [
    { field: "id", headerName: "ไอดี", width: 90 },
    {
      field: "p_name",
      headerName: "ชื่อสินค้า",
      width: 150,
      editable: true,
    },
    {
      field: "p_price",
      headerName: "ราคาสินค้า",
      type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "p_count",
      headerName: "เหลือ",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <ActionsComponent
          params={params}
          navigate={navigate}
          setDeleteId={setDeleteId}
          dispatch={dispatch}
          handleClickOpen={handleClickOpen}
        />
      ),
    },
  ];

  return (
    <ProductData
      navigate={navigate}
      deleteId={deleteId}
      products={products}
      columns={columns}
      dispatch={dispatch}
      open={open}
      handleClickOpen={handleClickOpen}
    />
  );
}

const ActionsComponent = ({
  params,
  handleClickOpen,
  setDeleteId,
  navigate,
}) => {
  const { id } = params;

  const showProduct = () => {
    navigate(`/showProduct/${id}`);
  };

  const editProduct = () => {
    navigate(`/editProduct/${id}`);
  };

  const setDeleteById = () => {
    handleClickOpen(true);
    setDeleteId(id);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="ดูสินค้า" placement="top">
        <IconButton aria-label="add to shopping cart" onClick={showProduct}>
          <PageviewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="เเก้ไขสินค้า" placement="top">
        <IconButton aria-label="add an alarm" onClick={editProduct}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="ลบสินค้า" placement="top">
        <IconButton aria-label="delete" onClick={setDeleteById}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

const ProductData = ({
  deleteId,
  products,
  columns,
  dispatch,
  handleClickOpen,
  open,
  navigate,
}) => {
  const [rows, setRows] = React.useState(products);
  const [searchText, setSearchText] = React.useState("");

  const deleteProductById = () => {
    dispatch(deleteProduct({ id: deleteId }));
    handleClickOpen(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = products.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(products);
  }, [products]);

  const createProduct = () => {
    navigate("/addProduct");
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 540,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            m: 1,
          }}
        >
          <Button variant="contained" color="primary" onClick={createProduct}>
            เพิ่มสินค้า
          </Button>
        </Box>
        <DataGrid
          components={{ Toolbar: QuickSearchToolbar }}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
          columns={columns}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => {
                requestSearch(event.target.value);
              },
              clearSearch: () => requestSearch(""),
            },
          }}
        />
      </Paper>
      <DeleteDialog
        open={open}
        handleClickOpen={handleClickOpen}
        deleteProductById={deleteProductById}
      />
    </>
  );
};
