import {Card , CardContent , Typography , CardHeader} from '@material-ui/core';
import { Doughnut } from "react-chartjs-2";

import useStyles from './DetailsStyles';

const Details = ({title}) =>
{
  const classes = useStyles();

  return (
    <Card className={title==='Income'?classes.income:classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant='h5'>$50</Typography>
      </CardContent>
    </Card>
  )
}

export default Details