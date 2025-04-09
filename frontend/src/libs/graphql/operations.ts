import { gql } from "@apollo/client";

export const GET_CITIES = gql`
  query GetCities {
    getCities {
      id
      name
      postalCode
      lattitude
      longitude
    }
}`;

export const GET_INTEREST_POINTS = gql`
query GetInterestPoints {
  getInterestPoints {
    id
    name
    address
    description
    longitude
    latitude
    link_url
    category {
      id
      name
    }
    city {
      id
      name
      postalCode
    }
  }
}`;
