import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SortDropdown from './TableSort';

// Add styling to table head/body with StyledTableCell component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#8ca0c7',
    borderBottom: '1px solid #000000',
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: '1px solid #000000',
    borderRight: '1px solid #000000',
    fontSize: 14,
    textAlign: 'center',
    '&:first-child': {
      borderLeft: '1px solid #000000'
    }
  }
}));

export function createRow(columns, values) {
  const row = {};
  columns.forEach((column, index) => {
    row[column.id] = values[index];
  });
  return row;
}

// StickyHeadTable component import - MUI
// Accept column and row props for reusability
export default function StickyHeadTable({ columns, rows }) {
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

  const sortedData = [...rows].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  return (
    <Paper sx={{ padding: 0, margin: '10%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '650px', overflowY: 'auto' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead style={{ textAlign: 'center' }}>
            <TableRow>
              {columns.map((column) => (
                // eslint-disable-next-line max-len
                <StyledTableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>{column.label}</span>
                    <SortDropdown onSort={(order) => requestSort(column.id, order)} />
                  </div>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow
                hover
                tabIndex={-1}
                key={row.address}
                style={{ borderBottom: index === rows.length - 1 ? 'none' : '1px solid #000000' }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
