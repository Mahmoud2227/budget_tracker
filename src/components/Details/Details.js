import {Card , CardContent , Typography , CardHeader} from '@material-ui/core';
import { Chart, registerables } from 'chart.js';
import {Doughnut} from "react-chartjs-2";
import useStyles from "./DetailsStyles";
import useTransactions from "../../hooks/use-transactions";

Chart.register( ...registerables );

const Details = ({title}) => {
  const classes = useStyles();
  const {chartData, total} = useTransactions(title);
  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant='h5'>${total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details