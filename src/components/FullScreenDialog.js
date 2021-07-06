import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import React, { useEffect, useState } from "react"
import { sortData } from "../util"
import TableDataCountry from "./TableDataCountry"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#212121",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  wrapSearchInput: {
    padding: "0 12px",
    width: "100%",
    maxWidth: 1600,
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  searchInput: {
    margin: "16px 0",
    [theme.breakpoints.down("md")]: {
      margin: "10px 0 10px 4px ",
    },
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />
})

const FullScreenDialog = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const sortedData = sortData(data)
          setTableData(sortedData)
        })
    }
    if (open) {
      getCountriesData()
    }
    // eslint-disable-next-line
  }, [open])

  return (
    <>
      <Button color="primary" size="small" onClick={handleClickOpen}>
        Show details
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // @ts-ignore
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Cases by country
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.wrapSearchInput}>
          <TextField
            id="outlined-basic"
            label="Search country"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            className={classes.searchInput}
          />
        </div>
        <TableDataCountry tableData={tableData} searchTerm={searchTerm} />
      </Dialog>
    </>
  )
}

export default FullScreenDialog
