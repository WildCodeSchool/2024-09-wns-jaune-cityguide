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

export const CREATE_INTERESTPOINT = gql`
  mutation CreateInterestPoint($data: InterestPointInput!) {
    createInterestPoint(data: $data) {
      id
    }
}`;

export const REPLACE_INTERESTPOINT = gql`
  mutation ReplaceInterestPointById($data: InterestPointInput!, $interestPointId: String!) {
    replaceInterestPointById(data: $data, interestPointId: $interestPointId) {
      id
    }
}`;

export const DELETE_INTERESTPOINT = gql`
  mutation DeleteInterestPointById($interestPointId: String!) {
    deleteInterestPointById(interestPointId: $interestPointId)
}`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
      color
    }
  }
`;