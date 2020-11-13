import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

const InfoBox = ({ title, cases, isRed, isCopper, active, total, ...props }) => {
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox__selected'} ${isRed && 'infoBox__red'} ${isCopper && 'infoBox__copper'}`}>
      <CardContent>
        <Typography className="infoBox__title">
          {title}
        </Typography>

        <h2 className={`infoBox__cases ${isRed && 'info__cases__red' } ${isCopper && 'info__cases__copper'}`}>{cases}</h2>

        <Typography className={`infoBox__total ${isRed && 'info__cases__red' } ${isCopper && 'info__cases__copper'}`}>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoBox;
