import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { numberPrintStat } from "../util"

const useStyles = makeStyles(() => ({
  table: { minWidth: 700, maxWidth: 1600, margin: "0 auto" },
  country: {
    display: "flex",
    alignItems: "center",
    height: "auto",
    "& img": {
      marginRight: 8,
    },
  },
  tableContainer: {},
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [theme.breakpoints.down("md")]: {
      paddingTop: 6,
      paddingBottom: 6,
    },
  },
  body: {
    fontSize: 15,
    height: 44,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const TableDataCountry = ({ tableData, searchTerm }) => {
  const classes = useStyles()
  // const [searchTerm, setSearchTerm] = useState("")

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell align="right">Cases (Today)</StyledTableCell>
            <StyledTableCell align="right">Recovered (Today)</StyledTableCell>
            <StyledTableCell align="right">Deaths (Today)</StyledTableCell>
            <StyledTableCell align="right">Active</StyledTableCell>
            <StyledTableCell align="right">Tests</StyledTableCell>
            <StyledTableCell align="right">Population</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            // eslint-disable-next-line
            ?.filter((val) => {
              if (searchTerm === "") {
                return val
              } else if (val.country.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
            })
            .map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell className={classes.country}>
                  <img src={row.countryInfo.flag} alt="" loading="lazy" width="26" /> {row.country}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {numberPrintStat(row.cases)} ({numberPrintStat(row.todayCases)})
                </StyledTableCell>
                <StyledTableCell align="right">
                  {numberPrintStat(row.recovered)} ({numberPrintStat(row.todayRecovered)})
                </StyledTableCell>
                <StyledTableCell align="right">
                  {numberPrintStat(row.deaths)} ({numberPrintStat(row.todayDeaths)})
                </StyledTableCell>
                <StyledTableCell align="right">{numberPrintStat(row.active)}</StyledTableCell>
                <StyledTableCell align="right">{numberPrintStat(row.tests)}</StyledTableCell>
                <StyledTableCell align="right">{numberPrintStat(row.population)}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableDataCountry
