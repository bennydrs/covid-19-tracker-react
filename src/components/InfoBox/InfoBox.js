import { Card, Typography } from "@material-ui/core"
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat"
import TrendingUpIcon from "@material-ui/icons/TrendingUp"
import { prettyPrintStat } from "../../util"
import "./InfoBox.css"

const InfoBox = ({ title, cases, isRed, isCopper, active, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox__selected"} ${isRed && "infoBox__red"} ${
        isCopper && "infoBox__copper"
      }`}
    >
      <Typography className="infoBox__title">{title}</Typography>

      <h2
        className={`infoBox__cases ${isRed && "info__cases__red"} ${
          isCopper && "info__cases__copper"
        }`}
      >
        {cases > 0 ? (
          <TrendingUpIcon className="infoBox__icon" />
        ) : (
          <TrendingFlatIcon className="infoBox__icon" />
        )}{" "}
        {prettyPrintStat(cases)}
      </h2>

      <Typography
        className={`infoBox__total ${isRed && "info__cases__red"} ${
          isCopper && "info__cases__copper"
        }`}
      >
        {total}
      </Typography>
    </Card>
  )
}

export default InfoBox
