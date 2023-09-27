import DataTable from "react-data-table-component";

export const Cars = ({ loading, cars }: { loading: boolean; cars: Car[] }) => {
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
      name: "ModelDetails",
      selector: (row: Car) => row.modelDetails,
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

  return (
    <DataTable
      columns={columns}
      data={cars}
      progressPending={loading}
      expandableRows
    />
  );
};

interface Car {
  __typename: string;
  vin: string;
  manufacturer: string;
  modelDetails: string;
  gearBox: string;
  color: string;
  mielage: string;
  firstRegistrationDate: string;
}
