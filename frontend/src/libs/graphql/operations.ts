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

export const REGISTER_USER = gql`
  mutation RegisterUser($data: NewUserInput!) {
    registerUser(data: $data) {
      firstname
      lastname
      email
      hashedPassword
    }
}`