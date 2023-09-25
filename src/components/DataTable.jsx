import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Popover,
} from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";

export default function DataTable({ data, columns, options }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = [10, 25, 50, 100];

  const [page, setPage] = useState(0);

  const [searchedRegister, setSearchedRegister] = useState("");

  const [anchorElOptions, setAnchorElOptions] = useState(
    Array(data.length).fill(null)
  );

  function handleOptionClick(event, rowIndex) {
    const newAnchorElOptions = [...anchorElOptions];
    newAnchorElOptions[rowIndex] = event.currentTarget;
    setAnchorElOptions(newAnchorElOptions);
  }

  function handleOptionClose(rowIndex) {
    const newAnchorElOptions = [...anchorElOptions];
    newAnchorElOptions[rowIndex] = null;
    setAnchorElOptions(newAnchorElOptions);
  }

  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
        boxShadow: "4",
        borderRadius: "4",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <FormControl>
          <Select
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(event.target.value)}
            size="small"
          >
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={`option-${option}`} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          placeholder="Pesquisar"
          variant="outlined"
          size="small"
          onChange={(event) => setSearchedRegister(event.target.value)}
        />
      </Box>

      <Box>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#d4e9e2",
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    color: "#2eb82e",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}

              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, i) => (
              <TableRow>
                {columns.map((column) => (
                  <TableCell>{column.selector(row)}</TableCell>
                ))}

                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={(event) => handleOptionClick(event, i)}>
                    <MoreVert />
                  </IconButton>

                  <Popover
                    open={Boolean(anchorElOptions[i])}
                    anchorEl={anchorElOptions[i]}
                    onClose={() => handleOptionClose(i)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                      }}
                    >
                      {options.map((option) => {
                        return (
                          <Box
                            onClick={() => {
                              handleOptionClose(i);
                              option.onClick(row);
                            }}
                          >
                            {option.element}
                          </Box>
                        );
                      })}
                    </Box>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography>
          {page * rowsPerPage + 1}-
          {data.length >= rowsPerPage ? rowsPerPage * (page + 1) : data.length}{" "}
          de {data.length}
        </Typography>
      </Box>
    </Box>
  );
}
