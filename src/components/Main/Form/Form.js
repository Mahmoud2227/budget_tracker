import {useState, useContext, useEffect, useCallback} from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import {useSpeechContext} from "@speechly/react-client";

import {ExpenseTrackerContext} from "../../../context/context";
import {v4 as uuidv4} from "uuid";

import useStyles from "./FormStyles";
import {incomeCategories, expenseCategories} from "../../../constants/constants";

import formatDate from "../../../utils/formatDate";
import SnackBar from "../../SnackBar/SnackBar";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () =>
{
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const {addTransaction} = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();
  const [open, setOpen] = useState(false);

  const createTransaction = useCallback(() => {
    if ( Number.isNaN( +formData.amount ) && !formData.date.includes( "-" ) ) return;
    
    const transaction = { ...formData, amount: +formData.amount, id: uuidv4() };
    
    setOpen(true)
    addTransaction(transaction);
    setFormData(initialState);
  }, [addTransaction, formData]);

  useEffect( () =>
  {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({...formData, type: "Expense"});
      } else if (segment.intent.intent === "add_income") {
        setFormData({...formData, type: "Income"});
      } else if (segment.isFinal && segment.intent.intent === "create_transaction") {
        return createTransaction();
      } else if (segment.isFinal && segment.intent.intent === "cancel_transaction") {
        return setFormData(initialState);
      }

      segment.entities.forEach((entity) => {
        const category = `${entity.value[0]}${entity.value.slice(1).toLowerCase()}`;
        switch (entity.type) {
          case "amount":
            setFormData({...formData, amount: entity.value});
            break;
          case "category":
            if (incomeCategories.map((iCategory) => iCategory.type).includes(category)) {
              setFormData({...formData, type: "Income", category: category});
            } else if (expenseCategories.map((eCategory) => eCategory.type).includes(category)) {
              setFormData({...formData, type: "Expense", category: category});
            }
            break;
          case "date":
            setFormData({...formData, date: entity.value});
            break;
          default:
            break;
        }
      });
      if (segment.isFinal && formData.amount && formData.category) {
        return createTransaction();
      }
    }
  }, [segment,formData,createTransaction]);

  const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;
  return (
    <div>
      <Grid container spacing={ 2 }>
        <SnackBar open={open} setOpen={setOpen} />
        <Grid item xs={12}>
          <Typography align='center' variant='subtitle2' gutterBottom>
            {segment && segment.words.map((word) => word.value).join(" ")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  type: e.target.value,
                }))
              }>
              <MenuItem value='Income'>Income</MenuItem>
              <MenuItem value='Expense'>Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  category: e.target.value,
                }))
              }>
              {selectedCategories.map((category) => (
                <MenuItem key={category.type} value={category.type}>
                  {category.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type='number'
            label='Amount'
            fullWidth
            value={formData.amount}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                amount: e.target.value,
              }))
            }></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type='date'
            label='Date'
            fullWidth
            value={formData.date}
            onChange={(e) =>
              setFormData((prevState) => ({...prevState, date: formatDate(e.target.value)}))
            }></TextField>
        </Grid>
        <Button
          className={classes.button}
          variant='outlined'
          color='primary'
          fullWidth
          onClick={createTransaction}>
          Create
        </Button>
      </Grid>
    </div>
  );
};

export default Form;
