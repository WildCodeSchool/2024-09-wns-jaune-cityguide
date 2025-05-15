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

export const LOGOUT = gql`
  mutation Mutation {
  logoutUser
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
    registerUser(data: $data)
}`


export const GET_CATEGORIES = gql`
query GetCategories {
  getCategories {
    id
    name
    description
    color
  }
}`;


export const GET_CATEGORY_BY_ID = gql`
query GetCategoryById($categoryId: String!) {
  getCategoryById(categoryId: $categoryId) {
    id
    name
    description
    color
  }
}`;


export const CREATE_CATEGORY = gql`
mutation CreateCategory($data: CategoryInput!) {
  createCategory(data: $data) {
    name
    description
    color
  }
}`;


export const REPLACE_CATEGORY_BY_ID = gql`
mutation ReplaceCategoryById($data: UpdateCategoryInput!, $categoryId: String!) {
  replaceCategoryById(data: $data, categoryId: $categoryId) {
    id
    name
    description
    color
  }
}`;


export const DELETE_CATEGORY = gql`
mutation DeleteCategoryById($categoryId: String!) {
  deleteCategoryById(categoryId: $categoryId)
}`;