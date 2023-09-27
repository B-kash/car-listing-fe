import DataTable from "react-data-table-component";
import { CarComponent } from "./Car";
import { useMemo, useState } from "react";
import { Car, GearBoxes } from "../__generated__/graphql";
import { gql, useQuery, useMutation } from "@apollo/client";

export const Cars = () => {
  const { loading, error, data, refetch } = useQuery(CARS_LISTINGS);
  const [updateCar] = useMutation(UPDATE_CAR);
  const [cars, setCars] = useState<Car[] | null>(null);

  useMemo(() => {
    setCars(data?.cars || []);
  }, [data]);

  const carData = useMemo(() => {
    const carData: Car[] = [
      {
        vin: "",
        manufacturer: "",
        modelDetails: "",
        gearBox: GearBoxes.Automatic,
        color: "",
        mielage: 0,
        firstRegistrationDate: undefined,
      },
    ];
    if (cars) {
      carData.push(...cars);
    }
    return carData;
  }, [cars]);
  const columns = [
    {
      name: "VIN",
      selector: (row: Car) => row.vin,
    },
    {
      name: "Manufacturer",
      selector: (row: Car) => row.manufacturer,
    },
    {
      name: "Gearbox",
      selector: (row: Car) => row.gearBox,
    },
    {
      name: "Color",
      selector: (row: Car) => row.color,
    },
    {
      name: "Mielage",
      selector: (row: Car) => row.mielage,
    },
    {
      name: "FirstRegistrationDate",
      selector: (row: Car) => row.firstRegistrationDate,
    },
  ];

  const onSubmit = async (car: Car) => {
    try {
      setCars(null);
      const result = await updateCar({
        variables: {
          input: {
            color: car.color,
            firstRegistrationDate: car.firstRegistrationDate,
            gearBox: car.gearBox,
            manufacturer: car.manufacturer,
            mielage: Number(car.mielage),
            modelDetails: car.modelDetails,
            vin: car.vin,
          },
        },
      });
      const updatedCar = result.data.updateCar;
      console.log("Car updated:", updatedCar);
      refetch();
    } catch (err) {
      console.error("Error updating car:", err);
    }
  };

  if (error) return <p>Error : {error.message}</p>;
  return (
    <DataTable
      title="All Cars, Click on empty row to add new car. Click on row to edit"
      columns={columns}
      data={carData}
      progressPending={loading}
      expandableRows
      expandableRowsComponent={CarComponent}
      expandableRowsComponentProps={{ onSubmit: onSubmit }}
      expandOnRowClicked
      expandableRowsHideExpander
      pagination
      striped
    />
  );
};

const CARS_LISTINGS = gql`
  query GetCarListings {
    cars {
      __typename
      vin
      manufacturer
      modelDetails
      gearBox
      color
      mielage
      firstRegistrationDate
    }
  }
`;

const UPDATE_CAR = gql`
  mutation UpdateCar($input: CarInput!) {
    updateCar(input: $input) {
      __typename
      vin
      manufacturer
      modelDetails
      gearBox
      color
      mielage
      firstRegistrationDate
    }
  }
`;
