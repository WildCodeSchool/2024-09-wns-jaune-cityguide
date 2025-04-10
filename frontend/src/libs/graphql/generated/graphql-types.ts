import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  color: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  interestPoints: InterestPoint;
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  interestPoints: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['String']['output'];
  interestPoints: Array<InterestPoint>;
  lattitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  users: Array<User>;
};

export type CityInput = {
  interestPoints: Array<Scalars['ID']['input']>;
  lattitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
};

export type InterestPoint = {
  __typename?: 'InterestPoint';
  address: Scalars['String']['output'];
  category: Category;
  city: City;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  link_url: Scalars['String']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  pictures: Array<Picture>;
};

export type InterestPointInput = {
  address: Scalars['String']['input'];
  category: Scalars['ID']['input'];
  city: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  link_url: Scalars['String']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  pictures?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createCity: City;
  createInterestPoint: InterestPoint;
  createPicture: Picture;
  deleteCategoryById: Scalars['Boolean']['output'];
  deleteCityById: Scalars['Boolean']['output'];
  deleteInterestPointById: Scalars['Boolean']['output'];
  deletePictureById: Scalars['Boolean']['output'];
  deleteUser: User;
  forgotPassword: Scalars['String']['output'];
  loginUser: Scalars['String']['output'];
  registerUser: User;
  replaceCategoryById: Category;
  replaceInterestPointById: InterestPoint;
  resetPassword: Scalars['String']['output'];
  updateCityById: City;
  updatePictureById: Picture;
  updateUser: User;
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateCityArgs = {
  data: CityInput;
};


export type MutationCreateInterestPointArgs = {
  data: InterestPointInput;
};


export type MutationCreatePictureArgs = {
  data: PictureInput;
};


export type MutationDeleteCategoryByIdArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationDeleteCityByIdArgs = {
  cityId: Scalars['String']['input'];
};


export type MutationDeleteInterestPointByIdArgs = {
  interestPointId: Scalars['String']['input'];
};


export type MutationDeletePictureByIdArgs = {
  pictureId: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  data: UserInput;
};


export type MutationRegisterUserArgs = {
  data: NewUserInput;
};


export type MutationReplaceCategoryByIdArgs = {
  categoryId: Scalars['String']['input'];
  data: CategoryInput;
};


export type MutationReplaceInterestPointByIdArgs = {
  data: InterestPointInput;
  interestPointId: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateCityByIdArgs = {
  cityId: Scalars['String']['input'];
  data: CityInput;
};


export type MutationUpdatePictureByIdArgs = {
  data: PictureInput;
  pictureId: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  userId: Scalars['String']['input'];
};

export type NewUserInput = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Picture = {
  __typename?: 'Picture';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  interestPoint: InterestPoint;
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PictureInput = {
  description: Scalars['String']['input'];
  interestPoint: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategoryById: Category;
  getCities: Array<City>;
  getCityById: City;
  getInterestPointById: InterestPoint;
  getInterestPoints: Array<InterestPoint>;
  getInterestPointsByCategory: InterestPoint;
  getInterestPointsByCity: InterestPoint;
  getPictureById: Picture;
  getPictures: Array<Picture>;
  getPicturesByInterestPoint: Array<Picture>;
  getUserById: User;
  getUsers: Array<User>;
};


export type QueryGetCategoryByIdArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetCityByIdArgs = {
  adId: Scalars['String']['input'];
};


export type QueryGetInterestPointByIdArgs = {
  interestPointId: Scalars['String']['input'];
};


export type QueryGetInterestPointsByCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetInterestPointsByCityArgs = {
  cityId: Scalars['String']['input'];
};


export type QueryGetPictureByIdArgs = {
  pictureId: Scalars['String']['input'];
};


export type QueryGetPicturesByInterestPointArgs = {
  interestPointId: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  city: Array<City>;
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  resetToken?: Maybe<Scalars['String']['output']>;
  resetTokenExpiration?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Defines the role of the user */
export enum UserRole {
  CityAdmin = 'CITY_ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  SuperUser = 'SUPER_USER',
  User = 'USER'
}

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', id: string, name: string, postalCode: string, lattitude: number, longitude: number }> };

export type LoginUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: string };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };


export const GetCitiesDocument = gql`
    query GetCities {
  getCities {
    id
    name
    postalCode
    lattitude
    longitude
  }
}
    `;

/**
 * __useGetCitiesQuery__
 *
 * To run a query within a React component, call `useGetCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
      }
export function useGetCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export function useGetCitiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCitiesQuery, GetCitiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCitiesQuery, GetCitiesQueryVariables>(GetCitiesDocument, options);
        }
export type GetCitiesQueryHookResult = ReturnType<typeof useGetCitiesQuery>;
export type GetCitiesLazyQueryHookResult = ReturnType<typeof useGetCitiesLazyQuery>;
export type GetCitiesSuspenseQueryHookResult = ReturnType<typeof useGetCitiesSuspenseQuery>;
export type GetCitiesQueryResult = Apollo.QueryResult<GetCitiesQuery, GetCitiesQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: UserInput!) {
  loginUser(data: $data)
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($newPassword: String!, $token: String!) {
  resetPassword(newPassword: $newPassword, token: $token)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;