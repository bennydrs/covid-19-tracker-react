import { Card, Hidden, TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import "./Header.css"

const Header = ({ value, countries, setValue }) => {
  const refreshPage = () => {
    window.location.reload(false)
  }

  return (
    <Card className="header__cardHeader">
      <div className="header">
        <h2 onClick={refreshPage}>
          <Hidden mdDown>COVID</Hidden>
          <Hidden mdUp>C</Hidden>
          <span className="dash">-</span>
          <span className="nineteen">19</span>
        </h2>
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
      </div>
    </Card>
  )
}

export default Header
