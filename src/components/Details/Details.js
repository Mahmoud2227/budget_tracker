import {Card , CardContent , Typography , CardHeader} from '@material-ui/core';
import {Chart} from "chart.js/auto";
import {Doughnut} from "react-chartjs-2";
import useStyles from "./DetailsStyles";
import useTransactions from "../../hooks/use-transactions";

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