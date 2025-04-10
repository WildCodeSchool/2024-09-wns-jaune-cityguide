import { gql } from "@apollo/client";

export const GET_CITIES = gql`
  query GetCities {
    getCities {
      id
      name
      postalCode
      latitude
      longitude
    }
}`;

export const GET_INTEREST_POINTS = gql`
query GetInterestPoints {
  getInterestPoints {
    id
    name
    description
    address
    latitude
    longitude
    link_url
    city {
      id
      name
      postalCode
    }
    category {
      id
      name
      description
      color
    }
    pictures {
      id
      url
      name
      description
    }
  }
}`;

export const GET_INTEREST_POINTS_BY_CITY = gql`
query GetInterestPointsByCity($cityId: String!) {
  getInterestPointsByCity(cityId: $cityId) {
    id
    name
    description
    address
    latitude
    longitude
    link_url
    city {
      id
      name
      postalCode
    }
    category {
      id
      name
      description
      color
    }
    pictures {
      id
      url
      name
      description
    }
  }
}`;
