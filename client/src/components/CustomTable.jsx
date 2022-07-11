import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { CustomLink } from "./CustomLink";
import { yearEnds } from "data";

const CustomTable = ({ items, columns, url }) => {
  const [page, setPage] = useState(0);
  const [tableRows, setTableRows] = useState(10);

  const pageChange = (event, newPage) => {
    setPage(newPage);
  };

  const changeRowsPerPage = (e) => {
    setTableRows(+e.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * tableRows, page * tableRows + tableRows)
              .map((item) => {
                return (
                  <TableRow key={item.id} tabIndex={-1} hover>
                    {columns.map((column) => {
                      let cellValue = null;
                      if (column.id === "yearEnd") {
                        const period = yearEnds.filter(
                          (value) => value.code === item.yearEnd
                        );
                        cellValue = period[0].period;
                      } else if (column.id === "shares") {
                        cellValue = item.totalShares * item.nominalValue;
                      } else {
                        cellValue = item[column.id];
                      }
                      const value = cellValue;

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "action" ? (
                            <Typography textAlign="center">
                              <CustomLink path={`${url}/${item.id}`}>
                                <IconButton>
                                  <EastIcon fontSize="small" color="inherit" />
                                </IconButton>
                              </CustomLink>
                            </Typography>
                          ) : column.format && typeof value === "number" ? (
                            <>{column.format(value)}</>
                          ) : column.id === "textColor" ? (
                            <Box
                              sx={{
                                backgroundColor: value,
                                height: 20,
                                width: 50,
                                borderRadius: 8,
                                border: "1px solid silver",
                              }}
                            />
                          ) : (
                            <>{value}</>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={items.length}
        rowsPerPage={tableRows}
        page={page}
        onPageChange={pageChange}
        onRowsPerPageChange={changeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;
