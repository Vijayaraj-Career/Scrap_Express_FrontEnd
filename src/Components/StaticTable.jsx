import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import { Checkbox, TableFooter, TablePagination, TextField, Tooltip } from '@mui/material';
import utils from '../Utils/Utils';
import _ from 'lodash';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { format, isValid } from 'date-fns';
import { makeStyles } from '@mui/styles';

const { fixArrayDates } = utils;

const useStyles = makeStyles({
  minHeight: {
    '& .MuiOutlinedInput-root': { minHeight: 0 },
    '& .MuiTablePagination-toolbar': { minHeight: 0 },
  },
  root: { '& .MuiInputBase-root': { padding: 0 } },
});

const BasicDatePicker = ({ onChange, fmt }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="filter"
        format={fmt || 'dd/MM/yyyy'}
        onChange={onChange}
        slotProps={{
          textField: { variant: 'filled', fullWidth: true, size: 'small' },
          actionBar: { actions: ['clear', 'accept'] },
        }}
      />
    </LocalizationProvider>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // padding: 1,
    margin: 1,
    backgroundColor: '#003264',
    color: theme.palette.common.white,
    border: '1px solid #E8E8E8',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    // padding: 5,
    // margin: 8,
    fontWeight: 400,
    border: '1px solid #E8E8E8',
  },
  [`&.${tableCellClasses.footer}`]: {
    border: '1px solid #E8E8E8',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
    border: '1px solid #E8E8E8',
  },
  '&:last-child td, &:last-child th': {
    // border: 5,
    // padding: 1,
    border: '1px solid #E8E8E8',
  },
}));

const getExpr = (str) => {
  let result = str;
  const match = [...str.matchAll(/[!-/]/g)].reduce((a, b) => [...a, ...b], []);
  _.uniq(match).forEach((m) => {
    const rpl = `[${m}]`;
    result = result.replaceAll(m, rpl);
  });
  return result;
};

const getCellStyle = ({ minWidth, maxWidth, cellStyle }) => ({
  width: minWidth === maxWidth ? minWidth : null,
  minWidth,
  maxWidth,
  ...cellStyle,
});

const StaticTable = ({
  className,
  headers = [],
  rows = [],
  options,
  hideFilters,
  hidePagination,
  dateFormat = 'dd/MM/yyyy',
  size,
  cellStyle = {},
  //onRowClick = () => {},
  onRowDblClick = () => {},
  tableProps,
  disablePageReset,
  rowColorChange,
  setRowColorChange,
  hideFooter,
  colSpan,
  total,
  checkboxSelection,
  selectionModel = [],
  handleSelection = () => {},
  fixedColumnBegin,
  fixedLeft,
  // fixedColEnd = 2,
  // fixedright = [90, 0],
}) => {
  console.log('headers', headers);
  console.log('headers Length', headers?.length);
  // console.log('fixedColEnd', fixedColEnd);
  // console.log('mid', headers?.slice(fixedColumnBegin, headers?.length - fixedColEnd));
  // console.log('dd', headers?.slice(headers?.length - fixedColEnd, headers?.length + 1));
  // console.log('end', headers?.slice(headers?.length - fixedColEnd, headers?.length + 1));
  const classes = useStyles();
  const [sort] = useState({ sortBy: null, sortOrder: 'asc' });
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 0, pageSize: size });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [selectedRows, setSelectedRows] = useState(selectionModel);

  const { sortBy, sortOrder } = sort;

  useEffect(() => {
    if (rowColorChange) {
      setSelectedRowIndex(null);
    }
  }, [rowColorChange, setRowColorChange]);

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
    if (setRowColorChange) setRowColorChange(false);
  };

  let sortedRows = rows.map((r, i) => ({ ...r, rowIndex: i }));
  if (sortBy) sortedRows = _.sortBy(sortedRows, sortBy);
  if (sortOrder === 'desc') sortedRows = _.reverse(sortedRows);

  const filteredRows = sortedRows.filter((row) =>
    _.every(
      Object.keys(filters).map((flt) => {
        const value = row[flt];
        const valueType = typeof value;
        const filterValue = filters[flt];
        const exp = new RegExp(getExpr(filterValue), 'i');
        if (filterValue === '') return true;
        if (valueType === 'string') return exp.test(value);
        if (valueType === 'number') return exp.test(value.toString());
        return false;
      }),
      Boolean
    )
  );

  const { page: pg, pageSize } = pagination;
  const { length: count } = filteredRows;

  const page = pg * pageSize - count > 0 ? 0 : pg;
  const pageStart = hidePagination ? 0 : page * pageSize;
  const pageEnd = hidePagination ? count : pageStart + pageSize;

  const tableRows = fixArrayDates(filteredRows.slice(pageStart, pageEnd), dateFormat);

//  s

  const handleFilterChange = (id, filter) => {
    setPagination((prev) => ({ ...prev, page: 0 }));
    setFilters((flt) => ({ ...flt, [id]: filter }));
  };

  const filterFields = headers.map(({ id, type, hideFilter }) => {
    if (hideFilter) return false;

    if (type === 'date') {
      return (
        <BasicDatePicker
          onChange={(e) => {
            handleFilterChange(id, isValid(e) ? format(e, 'yyyy-MM-dd') : '');
          }}
        />
      );
    }

    return (
      <TextField
        className={`${classes.minHeight} ${classes.input}`}
        variant="filled"
        label="filter"
        fullWidth
        size="small"
        onKeyDown={(e) => e.stopPropagation()}
        onChange={(e) => handleFilterChange(id, e.target.value)}
        // InputProps={{
        //   endAdornment: (
        //     <FilterList
        //       sx={{ height: '10px', width: '10px' }}
        //       // style={{
        //       //   padding: 3,
        //       //   color: '#4b5563',
        //       //   fontSize: 13,
        //       //   fontWeight: 500,
        //       //   lineHeight: '15px',
        //       // }}
        //     />
        //   ),
        // }}
      />
    );
  });

  useEffect(() => {
    if (!disablePageReset) {
      setPagination((prev) => ({ ...prev, page: 0 }));
    }
  }, [disablePageReset, rows]);

  useEffect(() => {
    if (!!selectionModel.length && checkboxSelection) {
      setSelectedRows(selectionModel);
    }
    if (!selectionModel.length && checkboxSelection) {
      setSelectedRows([]);
      if (!rows.length) setPagination((prev) => ({ ...prev, page: 0 }));
    }
  }, [rows, selectionModel, checkboxSelection]);

  const handleClick = (e, rowIndex) => {
    const selectedIndex = selectedRows.indexOf(rowIndex);
    const selectRowIndex = selectedRows.filter((row) => row !== rowIndex);
    setSelectedRows(selectedIndex === -1 ? [...selectedRows, rowIndex] : selectRowIndex);
    // updateSelectedTotals(selectedIndex === -1 ? [...selectedRows, rowIndex] : selectRowIndex);
    handleSelection(selectedIndex === -1 ? [...selectedRows, rowIndex] : selectRowIndex);
  };

  const isSelected = (rowIndex) => selectedRows.indexOf(rowIndex) !== -1;

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelectedRows = filteredRows.map((n) => n.rowIndex);
      setSelectedRows(newSelectedRows);
      // updateSelectedTotals(newSelectedRows);
      handleSelection(newSelectedRows);
    } else {
      setSelectedRows([]);
      // setSelectedTotals({});
      handleSelection([]);
    }
  };

  return (
    <Paper sx={{ width: '100%', height: '30' }} className={className}>
      <TableContainer component={Paper} className={className} {...tableProps}>
        <Table stickyHeader aria-label="sticky table">
          {/* <Table stickyHeader sx={{ minHeight: 30, minWidth: 300, overflow: 20 }}> */}
          <TableHead style={{ position: 'sticky', zIndex: 9999 }}>
            <TableRow>
              {checkboxSelection ? (
                <>
                  <TableCell
                    key={0}
                    sx={{
                      backgroundColor: '#003264',
                      color: '#FFF',
                      width: '40px',
                      left: 0,
                      right: 0,
                      position: 'sticky',
                      zIndex: 999,
                      top: 0,
                      // fontSize: 12,
                      border: '1px solid #ddd',
                      padding: '8px 5px 8px 5px',
                    }}
                    align="center"
                  >
                    <Checkbox
                      size="small"
                      indeterminate={
                        !!selectedRows.length && selectedRows.length < filteredRows.length
                      }
                      sx={{ height: '10px', width: '10px' }}
                      checked={!!filteredRows.length && selectedRows.length === filteredRows.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all rows' }}
                    />
                  </TableCell>
                  {fixedColumnBegin &&
                    headers?.slice(0, fixedColumnBegin)?.map(({ id, name, ...header }, idx) => (
                      <TableCell
                        key={id}
                        sx={{
                          ...getCellStyle(header),
                          backgroundColor: '#003264',
                          color: '#FFF',
                          left: idx === 0 ? 29.5 : fixedLeft[idx] + 29.5,
                          right: 0,
                          position: 'sticky',
                          zIndex: 999,
                          top: 0,
                          // fontSize: 12,
                          border: '1px solid #ddd',
                          padding: '8px 5px 8px 5px',
                        }}
                        align="center"
                      >
                        {/* <TableSortLabel
                      className=""
                      onClick={() => handleSortChange(id)}
                      active={sortBy === id}
                      direction={sortOrder}
                    > */}
                        {/* <Tooltip title={name}> */}
                        <span className="text-white truncate">{name}</span>
                        {/* </Tooltip> */}
                        {/* </TableSortLabel> */}
                      </TableCell>
                    ))}
                </>
              ) : (
                <>
                  {headers?.slice(0, fixedColumnBegin)?.map(({ id, name, ...header }, idx) => (
                    <TableCell
                      key={id}
                      sx={{
                        ...getCellStyle(header),
                        backgroundColor: '#003264',
                        color: '#FFF',
                        left: fixedLeft[idx],
                        right: 0,
                        position: 'sticky',
                        zIndex: 999,
                        top: 0,
                        // fontSize: 12,
                        border: '1px solid #ddd',
                        padding: '8px 5px 8px 5px',
                      }}
                      align="center"
                    >
                      {/* <TableSortLabel
                      className=""
                      onClick={() => handleSortChange(id)}
                      active={sortBy === id}
                      direction={sortOrder}
                    > */}
                      {/* <Tooltip title={name}> */}
                      <span className="text-white truncate">{name}</span>
                      {/* </Tooltip> */}
                      {/* </TableSortLabel> */}
                    </TableCell>
                  ))}
                </>
              )}
              {checkboxSelection
                ? headers
                    ?.slice(fixedColumnBegin, headers?.length - 1)
                    .map(({ id, name, ...header }) => (
                      <TableCell
                        key={id}
                        sx={{
                          ...getCellStyle(header),
                          // padding: '3px',
                          backgroundColor: '#003264',
                          border: '1px solid #ddd',
                          padding: '8px 5px 8px 5px',
                        }}
                        align="center"
                      >
                        {/* <TableSortLabel
                    className=""
                    onClick={() => handleSortChange(id)}
                    active={sortBy === id}
                    direction={sortOrder}
                  > */}
                        {/* <Tooltip title={name}> */}
                        <span className="text-white truncate">{name}</span>
                        {/* </Tooltip> */}
                        {/* </TableSortLabel> */}
                      </TableCell>
                    ))
                : headers
                    ?.slice(fixedColumnBegin, headers?.length - 1)
                    .map(({ id, name, ...header }) => (
                      <TableCell
                        key={id}
                        sx={{
                          ...getCellStyle(header),
                          // padding: '3px',
                          backgroundColor: '#003264',
                          border: '1px solid #ddd',
                          padding: '8px 5px 8px 5px',
                        }}
                        align="center"
                      >
                        {/* <TableSortLabel
                    className=""
                    onClick={() => handleSortChange(id)}
                    active={sortBy === id}
                    direction={sortOrder}
                  > */}
                        {/* <Tooltip title={name}> */}
                        <span className="text-white truncate">{name}</span>
                        {/* </Tooltip> */}
                        {/* </TableSortLabel> */}
                      </TableCell>
                    ))}
              <TableCell
                align="center"
                sx={{
                  ...getCellStyle(headers[headers?.length - 1]),
                  backgroundColor: '#003264',
                  color: '#FFF',
                  left: 0,
                  right: 0,
                  position: 'sticky',
                  zIndex: 999,
                  top: 0,
                  // fontSize: 12,
                  border: '1px solid #ddd',
                  padding: '8px 5px 8px 5px',
                }}
              >
                {headers?.[headers?.length - 1]?.name}
              </TableCell>
              {/* {fixedColEnd &&
                headers
                  ?.slice(headers?.length - fixedColEnd, headers?.length + 1)
                  ?.map(({ id, name, ...header }, idx) => (
                    <TableCell
                      key={id}
                      sx={{
                        ...getCellStyle(header),
                        backgroundColor: '#003264',
                        color: '#FFF',
                        left: 0,
                        right: fixedright[idx],
                        position: 'sticky',
                        zIndex: 999,
                        top: 0,
                        // fontSize: 12,
                        border: '1px solid #ddd',
                        padding: '8px 5px 8px 5px',
                      }}
                      align="center"
                    >
                      <span className="text-white truncate">{name}</span>
                    </TableCell>
                  ))} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!rows.length && !hideFilters && (
              <StyledTableRow>
                <TableCell style={{ zIndex: 999 }}>{filterFields[0]}</TableCell>
                {filterFields?.slice(1, filterFields?.length - 1).map((field, i) => (
                  <StyledTableCell style={{ zIndex: 99 }} key={i}>
                    {field}
                  </StyledTableCell>
                ))}
                <TableCell style={{ zIndex: 999 }}>
                  {filterFields[filterFields?.length - 1]}
                </TableCell>
              </StyledTableRow>
            )}
            {count ? (
              tableRows.map(({ rowIndex, ...row }, index) => {
                const isItemSelected = isSelected(rowIndex);
                const labelId = `checkbox-${index}`;
                const rowFields = {
                  rows,
                  row,
                  pageIndex: index,
                  rowIndex,
                  tableRows,
                  headers,
                  filters,
                  pagination,
                };
                return (
                  <Fragment key={rowIndex}>
                    <StyledTableRow
                      key={index}
                      onClick={() => handleRowClick(index)}
                      style={{
                        backgroundColor: selectedRowIndex === index ? '#ebedeb' : 'inherit',
                      }}
                      // onClick={() => onRowClick(rowFields)}
                      onDoubleClick={() => onRowDblClick(rowFields)}
                    >
                      {checkboxSelection ? (
                        <>
                          <TableCell
                            align="center"
                            sx={{
                              backgroundColor: '#E8E8E8',
                              padding: '3px 4px 3px 4px',
                              // minWidth: '100px',
                              left: 0,
                              right: 0,
                              position: 'sticky',
                              zIndex: 0,
                              fontSize: 12,
                              fontWeight: 400,
                              border: '1px solid #ddd',
                            }}
                          >
                            <Checkbox
                              checked={isItemSelected}
                              size="small"
                              sx={{ height: '3px', width: '3px' }}
                              inputProps={{ 'aria-labelledby': labelId }}
                              onChange={() => handleClick(index, rowIndex)}
                            />
                          </TableCell>
                          {fixedColumnBegin &&
                            headers
                              ?.slice(0, fixedColumnBegin)
                              .map(({ id, ...header }, idx) => (
                                <TableCell
                                  key={id}
                                  align="center"
                                  sx={{
                                    ...cellStyle,
                                    ...getCellStyle(header),
                                    backgroundColor: '#E8E8E8',
                                    padding: '3px 4px 3px 4px',
                                    // minWidth: '100px',
                                    left: idx === 0 ? 29.5 : fixedLeft[idx] + 29.5,
                                    right: 0,
                                    position: 'sticky',
                                    zIndex: 0,
                                    fontSize: 12,
                                    fontWeight: 400,
                                    border: '1px solid #ddd',
                                  }}
                                >
                                  {row[headers[idx]?.id]}
                                </TableCell>
                              ))}
                        </>
                      ) : (
                        <>
                          {headers
                            ?.slice(0, fixedColumnBegin)
                            .map(({ id, ...header }, idx) => (
                              <TableCell
                                key={id}
                                align="center"
                                sx={{
                                  ...cellStyle,
                                  ...getCellStyle(header),
                                  backgroundColor: '#E8E8E8',
                                  padding: '3px 4px 3px 4px',
                                  // minWidth: '100px',
                                  left: fixedLeft[idx],
                                  right: 0,
                                  position: 'sticky',
                                  zIndex: 0,
                                  fontSize: 12,
                                  fontWeight: 400,
                                  border: '1px solid #ddd',
                                }}
                              >
                                {row[headers[idx]?.id]}
                              </TableCell>
                            ))}
                        </>
                      )}
                      {checkboxSelection
                        ? headers
                            ?.slice(fixedColumnBegin, headers?.length - 1)
                            .map(({ id, renderCell, type, ...header }) => {
                              const value = row[id];
                              return (
                                <TableCell
                                  key={id}
                                  align={
                                    (!type && 'center') ||
                                    (type && type === 'number' ? 'right' : 'left')
                                  }
                                  className="truncate"
                                  sx={{
                                    ...cellStyle,
                                    ...getCellStyle(header),
                                    backgroundColor: '#F8F8F8',
                                    padding: '3px 4px 3px 4px',
                                    border: '1px solid #ddd',
                                    fontSize: 12,
                                    fontWeight: 400,
                                  }}
                                >
                                  {renderCell
                                    ? renderCell({
                                        ...rowFields,
                                        header: id,
                                        value,
                                      })
                                    : value}
                                </TableCell>
                              );
                            })
                        : headers
                            ?.slice(fixedColumnBegin, headers?.length - 1)
                            .map(({ id, renderCell, type, ...header }) => {
                              const value = row[id];
                              return (
                                <TableCell
                                  key={id}
                                  align={
                                    (!type && 'center') ||
                                    (type && type === 'number' ? 'right' : 'left')
                                  }
                                  className="truncate"
                                  sx={{
                                    ...cellStyle,
                                    ...getCellStyle(header),
                                    backgroundColor: '#F8F8F8',
                                    padding: '3px 4px 3px 4px',
                                    border: '1px solid #ddd',
                                    fontSize: 12,
                                    fontWeight: 400,
                                  }}
                                >
                                  {renderCell
                                    ? renderCell({
                                        ...rowFields,
                                        header: id,
                                        value,
                                      })
                                    : value}
                                </TableCell>
                              );
                            })}

                      <TableCell
                        align={typeof value === 'number' ? 'right' : 'center'}
                        sx={{
                          ...cellStyle,
                          ...getCellStyle(headers),
                          backgroundColor: '#E8E8E8',
                          // padding: 1,
                          padding: '3px 4px 3px 4px',
                          // minWidth: '100px',
                          left: 0,
                          right: 0,
                          position: 'sticky',
                          zIndex: 0,
                          fontSize: 12,
                          fontWeight: 400,
                          border: '1px solid #ddd',
                        }}
                      >
                        {row[headers?.[headers?.length - 1]?.id]}
                      </TableCell>
                      {/* {fixedColEnd &&
                        headers
                          ?.slice(headers?.length - fixedColEnd, headers?.length + 1)
                          ?.map(({ id, renderCell, type, ...header }, idx) => (
                            <TableCell
                              key={id}
                              align="center"
                              sx={{
                                ...cellStyle,
                                ...getCellStyle(header),
                                backgroundColor: '#E8E8E8',
                                padding: '3px 4px 3px 4px',
                                // minWidth: '100px',
                                left: 0,
                                right: fixedLeft[idx],
                                position: 'sticky',
                                zIndex: 0,
                                fontSize: 12,
                                fontWeight: 400,
                                border: '1px solid #ddd',
                              }}
                            >
                              {row[headers[idx]?.id]}
                            </TableCell>
                          ))} */}
                    </StyledTableRow>
                  </Fragment>
                );
              })
            ) : (
              <StyledTableRow key="no-data">
                <StyledTableCell colSpan={headers.length} className="text-center h-[131px]">
                  No data
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
          {!hideFooter && (
            <TableFooter
              style={{
                position: 'sticky',
                bottom: 0,
                background: '#e0e0e0',
              }}
            >
              <StyledTableRow className="">
                <StyledTableCell
                  colSpan={checkboxSelection ? colSpan + 1 : colSpan}
                  align="right"
                  style={{
                    color: '#000000',
                    fontWeight: 'bold',
                    paddingRight: '50px',
                  }}
                >
                  Total Amount
                </StyledTableCell>

                {total?.map((columnId, index) => (
                  <StyledTableCell
                    key={index}
                    align="right"
                    style={{ color: '#000000', fontWeight: 'bold' }}
                  >
                    {rows
                      ?.map((row) => row[columnId])
                      .reduce((acc, cur) => acc + cur, 0)
                      .toFixed(2)}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
      {!hidePagination && (
        <TablePagination
          className={`${classes.minHeight}`}
          rowsPerPageOptions={options}
          component="div"
          count={count}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={(__, p) => {
            setPagination((prev) => ({ ...prev, page: p }));
          }}
          onRowsPerPageChange={(e) =>
            setPagination({
              page: 0,
              pageSize: e.target.value,
            })
          }
        />
      )}
    </Paper>
  );
};

export const chaHeader = (...args) => ({
  id: args[0],
  name: args[1],
  type: args[2],
  minWidth: args[3] ?? '50px',
  maxWidth: args[4],
  hideFilter: args[5],
  renderCell:
    args[6] ??
    (({ value }) => (
      <Tooltip
        // title={value}
        PopperProps={{
          onClick(e) {
            e.stopPropagation();
          },
          onDoubleClick(e) {
            e.stopPropagation();
          },
        }}
      >
        <span>{value}</span>
      </Tooltip>
    )),
});

export default StaticTable;