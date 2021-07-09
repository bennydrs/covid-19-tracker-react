import {
  Card,
  CardContent,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import PublicIcon from "@material-ui/icons/Public"
import { useState } from "react"
import { numberPrintStat } from "../util"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: 0,
  },
  body: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: 0,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const StyledTablePagination = withStyles(() => ({
  root: {
    borderBottom: 0,
  },
}))(TablePagination)

const useStyles = makeStyles(() => ({
  country: {
    display: "flex",
    alignItems: "center",
    "& img": {
      marginRight: 8,
      borderRadius: 2,
    },
  },
}))

const TableDataVaccine = ({ data }) => {
  const classes = useStyles()

  let sum = 0
  const dataTable = data.map((d) => {
    sum += d[2]
    return {
      id: d[0],
      country: d[0],
      doses: d[2],
      flag: d[3],
    }
  })

  const dataTableSorted = dataTable.sort((a, b) => (a.doses > b.doses ? -1 : 1))

  const [page, setPage] = useState(0)
  const [rowsPerPage] = useState(13)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  return (
    <div>
      <TableContainer component={Card}>
        <CardContent>
          <Typography variant="h6" component="h3" className="header_geoChartVaccine">
            Vaccinations by Country
          </Typography>
          <div className="table_global">
            <span>
              <PublicIcon className="table_global_icon" /> Worldwide
            </span>
            <strong>{numberPrintStat(sum)}</strong>
          </div>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Country</StyledTableCell>
                <StyledTableCell align="right">Doses</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? dataTableSorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : dataTableSorted
              ).map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell className={classes.country}>
                    <img src={row.flag} alt="" width="25" height="15" loading="lazy" />{" "}
                    {row.country}
                  </StyledTableCell>
                  <StyledTableCell align="right">{numberPrintStat(row.doses)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <StyledTablePagination
                  colSpan={3}
                  count={dataTableSorted.length}
                  labelRowsPerPage=""
                  rowsPerPageOptions={[]}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </TableContainer>
    </div>
  )
}

export default TableDataVaccine
