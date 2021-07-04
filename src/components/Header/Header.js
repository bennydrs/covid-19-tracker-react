import { Card, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { timeSince } from "../../util"
import "./Header.css"

const Header = ({ value, countries, setValue, countryInfo }) => {
  const refreshPage = () => {
    window.location.reload(false)
  }

  return (
    <Card className="header__cardHeader">
      <div className="header">
        <h2 onClick={refreshPage}>
          COVID
          <span className="dash">-</span>
          <span className="nineteen">19</span>
        </h2>
        <div className="header__right">
          <Autocomplete
            value={value}
            options={countries}
            getOptionLabel={(option) => (option.name ? option.name : "")}
            getOptionSelected={(option, value) => {
              //nothing that is put in here will cause the warning to go away
              if (value === "") {
                return true
              } else if (value === option) {
                return true
              }
            }}
            onChange={(e, selectedObject) => {
              if (selectedObject !== null) {
                setValue(selectedObject)
              }
            }}
            renderOption={(option) => option.name}
            style={{ width: 220 }}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
          <p>Last Updated {timeSince(new Date(countryInfo.updated))} ago</p>
        </div>
      </div>
    </Card>
  )
}

export default Header
