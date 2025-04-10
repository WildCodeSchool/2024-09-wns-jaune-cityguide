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

export const REGISTER_USER = gql`
  mutation RegisterUser($data: NewUserInput!) {
    registerUser(data: $data) {
      firstname
      lastname
      email
      hashedPassword
    }
}`
