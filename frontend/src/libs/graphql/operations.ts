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


export const LOGIN = gql`
  mutation LoginUser($data: UserInput!) {
    loginUser(data: $data)
  }
`;


export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;


export const RESET_PASSWORD = gql`
  mutation resetPassword($newPassword: String!, $token: String!){
    resetPassword(newPassword: $newPassword, token: $token)
  }
`;