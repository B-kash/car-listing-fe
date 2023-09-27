import { useMemo } from "react";
import { Cars } from "./car-listings/Cars";
import { useQuery, gql } from "@apollo/client";

function App() {
  const { loading, error, data } = useQuery(CARS_LISTINGS);

  const cars = useMemo(() => {
    return data?.cars || [];
  }, [data]);

  if (error) return <p>Error : {error.message}</p>;

  console.log({ data });

  return (
    <>
      <Cars loading={loading} cars={cars}></Cars>
    </>
  );
}

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

export default App;
