import React, { useState } from "react";
import Joi from "joi";
import { ExpanderComponentProps } from "react-data-table-component";

import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  TextareaAutosize,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Car, GearBoxes } from "../__generated__/graphql";

const useStyles = makeStyles((theme: Theme) => ({
  carForm: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
    backgroundColor: theme.palette.background.default,
  },
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  label: {
    fontWeight: "bold",
    display: "block",
  },
  textField: {
    width: "100%",
  },
  error: {
    color: theme.palette.error.main,
    fontSize: "12px",
    marginTop: "4px",
  },
}));

// Define Joi validation schema for Car object
const carSchema = Joi.object({
  vin: Joi.string().required(),
  manufacturer: Joi.string().required(),
  modelDetails: Joi.string().required(),
  gearBox: Joi.string()
    .valid(GearBoxes.Automatic, GearBoxes.Manual, GearBoxes.Other)
    .required(),
  color: Joi.string().required(),
  mielage: Joi.number().required(),
  firstRegistrationDate: [Joi.date().iso().optional(), Joi.allow(null)],
});

interface CarComponentProps extends ExpanderComponentProps<Car> {
  onSubmit?: (car: Car) => void;
}

export const CarComponent: React.FC<CarComponentProps> = (props) => {
  const { data } = props;
  const initialCar = data;
  const classes = useStyles();
  const [selectedGearBox, setSelectedGearBox] = useState<string>(
    initialCar?.gearBox || ""
  );

  const [formData, setFormData] = useState<Car>(() => {
    const initialCarState: Car = {
      vin: "",
      manufacturer: "",
      modelDetails: "",
      gearBox: GearBoxes.Automatic,
      color: "",
      mielage: 0,
      firstRegistrationDate: new Date(),
    };
    if (data) {
      // Populate initialCarState if data is provided
      initialCarState.vin = data.vin || "";
      initialCarState.manufacturer = data.manufacturer || "";
      initialCarState.modelDetails = data.modelDetails || "";
      initialCarState.gearBox = data.gearBox || "";
      initialCarState.color = data.color || "";
      initialCarState.mielage = data.mielage || 0;
      initialCarState.firstRegistrationDate = data.firstRegistrationDate
        ? new Date(data.firstRegistrationDate.toString())
        : data.firstRegistrationDate;
    }
    return initialCarState;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> // Update the event type
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { error } = carSchema.validate(formData, { abortEarly: false });
    if (!error) {
      return null;
    }

    const validationErrors: Record<string, string> = {};
    error.details.forEach((detail) => {
      validationErrors[detail.context!.key!] = detail.message;
    });
    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    if (props.onSubmit) {
      props.onSubmit(formData);
    }
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, firstRegistrationDate: date });
  };

  const handleGearBoxChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValue = event.target.value as string;
    setSelectedGearBox(selectedValue);
    setFormData({
      ...formData,
      gearBox: selectedValue as unknown as GearBoxes,
    });
  };

  const isInsert = (value?: Car) => {
    if (!value) {
      return true;
    }
    return value.vin.length == 0;
  };

  return (
    <Box component={Paper} className={classes.carForm} p={3}>
      <Typography variant="h2">
        {!isInsert(initialCar) ? "Update Car" : "Create Car"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.formGroup}>
            <label className={classes.label}>VIN:</label>
            <TextField
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleInputChange}
              variant="outlined"
              required
              className={classes.textField}
            />
            <span className={classes.error}>{errors.vin}</span>
          </Grid>
          <Grid item xs={12} className={classes.formGroup}>
            <label className={classes.label}>Manufacturer:</label>
            <TextField
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              variant="outlined"
              required
              className={classes.textField}
            />
            <span className={classes.error}>{errors.manufacturer}</span>
          </Grid>
          <Grid item xs={12} className={classes.formGroup}>
            <label className={classes.label}>Model Details:</label>
            <TextareaAutosize
              minRows={3}
              name="modelDetails"
              value={formData.modelDetails}
              onChange={handleInputChange}
              className={classes.textField}
              required
            />
            <span className={classes.error}>{errors.modelDetails}</span>
          </Grid>
          <Grid item xs={12} className={classes.formGroup}>
            <label className={classes.label}>Gearbox:</label>
            <Select
              value={selectedGearBox}
              onChange={handleGearBoxChange}
              required
              className={classes.textField}
            >
              <MenuItem value="AUTOMATIC">AUTOMATIC</MenuItem>
              <MenuItem value="MANUAL">MANUAL</MenuItem>
              <MenuItem value="OTHER">OTHER</MenuItem>
            </Select>
            <span className={classes.error}>{errors.gearBox}</span>
          </Grid>
          <Grid item xs={12} className={classes.formGroup}>
            <label className={classes.label}>Color:</label>
            <TextField
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              variant="outlined"
              required
              className={classes.textField}
            />
            <span className={classes.error}>{errors.color}</span>
          </Grid>
          <Grid item xs={12} className={classes.formGroup}>
            <label className={classes.label}>Mileage:</label>
            <TextField
              type="text"
              name="mielage"
              value={formData.mielage}
              onChange={handleInputChange}
              variant="outlined"
              required
              className={classes.textField}
            />
            <span className={classes.error}>{errors.mielage}</span>
          </Grid>
          <Grid item xs={12} className={classes.formGroup}>
            <label className={classes.label}>First Registration Date:</label>
            <DatePicker
              selected={formData.firstRegistrationDate}
              onChange={(date) => handleDateChange(date as Date)}
              dateFormat="MM/dd/yyyy"
              className={classes.textField}
            />
            <span className={classes.error}>
              {errors.firstRegistrationDate}
            </span>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          {initialCar ? "Update Car" : "Create Car"}
        </Button>
      </form>
    </Box>
  );
};
