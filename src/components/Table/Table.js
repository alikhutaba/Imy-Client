import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "components/CustomButtons/Button.js";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, clickable, onClickButton, buttonName, page, handleChangePage, colors } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key1) => {
            return (
              <TableRow key={key1} className={classes.tableBodyRow}
              >
                {prop.map((prop, key) => {
                  return (//style={{ backgroundColor: 'red', color: 'white', }}
                    <TableCell className={classes.tableCell} key={key} style={colors ? { color: colors[key1], } : null}>
                      {prop}
                    </TableCell>
                  );
                })}
                {clickable !== undefined && clickable === true ?
                  <TableCell className={classes.tableCell} key={key1}><Button onClick={() => { onClickButton(key1) }} type="button" color="info" size="sm" >{buttonName}</Button></TableCell>
                  : null}
              </TableRow>
            );
          })}
        </TableBody>
        {clickable !== undefined && clickable === true ?

          <TableFooter>
            <TableRow>

              <TablePagination
                rowsPerPageOptions={[]}
                rowsPerPage={10}
                nextIconButtonProps={tableData.length < 10 ? { disabled: true } : { disabled: false }}
                count={-1}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
              // onChangeRowsPerPage={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
          : null}

      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
