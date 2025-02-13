import { gql } from "@apollo/client";


export const GET_CITIES = gql`
  query GetCities {
    getCities {
      id
      name
      postalCode
      lattitiude
      longitude
    }
}`;