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
  name: Scalars['String']['input'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['String']['output'];
  interestPoints: Array<InterestPoint>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  users: Array<User>;
};

export type CityInput = {
  interestPoints: Array<Scalars['ID']['input']>;
  latitude: Scalars['Float']['input'];
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
  logoutUser: Scalars['String']['output'];
  registerUser: Scalars['String']['output'];
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
  data: UpdateCategoryInput;
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
  cityId: Scalars['String']['input'];
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
  getCityCount: Scalars['Float']['output'];
  getInterestPointById: InterestPoint;
  getInterestPoints: Array<InterestPoint>;
  getInterestPointsByCategory: Array<InterestPoint>;
  getInterestPointsByCity: Array<InterestPoint>;
  getPictureById: Picture;
  getPictures: Array<Picture>;
  getPicturesByInterestPoint: Array<Picture>;
  getPlaceCount: Scalars['Float']['output'];
  getUserById: User;
  getUserCount: Scalars['Float']['output'];
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

export type UpdateCategoryInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  city: City;
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


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<{ __typename?: 'City', id: string, name: string, postalCode: string, latitude: number, longitude: number }> };

export type LoginUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: string };

export type MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationMutation = { __typename?: 'Mutation', logoutUser: string };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: string };

export type CreateInterestPointMutationVariables = Exact<{
  data: InterestPointInput;
}>;


export type CreateInterestPointMutation = { __typename?: 'Mutation', createInterestPoint: { __typename?: 'InterestPoint', id: string } };

export type ReplaceInterestPointByIdMutationVariables = Exact<{
  data: InterestPointInput;
  interestPointId: Scalars['String']['input'];
}>;


export type ReplaceInterestPointByIdMutation = { __typename?: 'Mutation', replaceInterestPointById: { __typename?: 'InterestPoint', id: string, name: string, description: string, address: string, link_url: string, category: { __typename?: 'Category', id: string, name: string, color: string }, pictures: Array<{ __typename?: 'Picture', id: string, url: string, name: string }> } };

export type DeleteInterestPointByIdMutationVariables = Exact<{
  interestPointId: Scalars['String']['input'];
}>;


export type DeleteInterestPointByIdMutation = { __typename?: 'Mutation', deleteInterestPointById: boolean };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, color: string }> };

export type GetInterestPointsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInterestPointsQuery = { __typename?: 'Query', getInterestPoints: Array<{ __typename?: 'InterestPoint', id: string, name: string, description: string, address: string, latitude: number, longitude: number, link_url: string, city: { __typename?: 'City', id: string, name: string, postalCode: string }, category: { __typename?: 'Category', id: string, name: string, description?: string | null, color: string }, pictures: Array<{ __typename?: 'Picture', id: string, url: string, name: string, description: string }> }> };

export type GetInterestPointsByCityQueryVariables = Exact<{
  cityId: Scalars['String']['input'];
}>;


export type GetInterestPointsByCityQuery = { __typename?: 'Query', getInterestPointsByCity: Array<{ __typename?: 'InterestPoint', id: string, name: string, description: string, address: string, latitude: number, longitude: number, link_url: string, city: { __typename?: 'City', id: string, name: string, postalCode: string }, category: { __typename?: 'Category', id: string, name: string, description?: string | null, color: string }, pictures: Array<{ __typename?: 'Picture', id: string, url: string, name: string, description: string }> }> };

export type RegisterUserMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: string };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, description?: string | null, color: string }> };

export type GetCategoryByIdQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', getCategoryById: { __typename?: 'Category', id: string, name: string, description?: string | null, color: string } };

export type CreateCategoryMutationVariables = Exact<{
  data: CategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', name: string, description?: string | null, color: string } };

export type ReplaceCategoryByIdMutationVariables = Exact<{
  data: UpdateCategoryInput;
  categoryId: Scalars['String']['input'];
}>;


export type ReplaceCategoryByIdMutation = { __typename?: 'Mutation', replaceCategoryById: { __typename?: 'Category', id: string, name: string, description?: string | null, color: string } };

export type DeleteCategoryByIdMutationVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type DeleteCategoryByIdMutation = { __typename?: 'Mutation', deleteCategoryById: boolean };


export const GetCitiesDocument = gql`
    query GetCities {
  getCities {
    id
    name
    postalCode
    latitude
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
export const MutationDocument = gql`
    mutation Mutation {
  logoutUser
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
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
export const CreateInterestPointDocument = gql`
    mutation CreateInterestPoint($data: InterestPointInput!) {
  createInterestPoint(data: $data) {
    id
  }
}
    `;
export type CreateInterestPointMutationFn = Apollo.MutationFunction<CreateInterestPointMutation, CreateInterestPointMutationVariables>;

/**
 * __useCreateInterestPointMutation__
 *
 * To run a mutation, you first call `useCreateInterestPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInterestPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInterestPointMutation, { data, loading, error }] = useCreateInterestPointMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInterestPointMutation(baseOptions?: Apollo.MutationHookOptions<CreateInterestPointMutation, CreateInterestPointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInterestPointMutation, CreateInterestPointMutationVariables>(CreateInterestPointDocument, options);
      }
export type CreateInterestPointMutationHookResult = ReturnType<typeof useCreateInterestPointMutation>;
export type CreateInterestPointMutationResult = Apollo.MutationResult<CreateInterestPointMutation>;
export type CreateInterestPointMutationOptions = Apollo.BaseMutationOptions<CreateInterestPointMutation, CreateInterestPointMutationVariables>;
export const ReplaceInterestPointByIdDocument = gql`
    mutation ReplaceInterestPointById($data: InterestPointInput!, $interestPointId: String!) {
  replaceInterestPointById(data: $data, interestPointId: $interestPointId) {
    id
    name
    description
    address
    link_url
    category {
      id
      name
      color
    }
    pictures {
      id
      url
      name
    }
  }
}
    `;
export type ReplaceInterestPointByIdMutationFn = Apollo.MutationFunction<ReplaceInterestPointByIdMutation, ReplaceInterestPointByIdMutationVariables>;

/**
 * __useReplaceInterestPointByIdMutation__
 *
 * To run a mutation, you first call `useReplaceInterestPointByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceInterestPointByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceInterestPointByIdMutation, { data, loading, error }] = useReplaceInterestPointByIdMutation({
 *   variables: {
 *      data: // value for 'data'
 *      interestPointId: // value for 'interestPointId'
 *   },
 * });
 */
export function useReplaceInterestPointByIdMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceInterestPointByIdMutation, ReplaceInterestPointByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceInterestPointByIdMutation, ReplaceInterestPointByIdMutationVariables>(ReplaceInterestPointByIdDocument, options);
      }
export type ReplaceInterestPointByIdMutationHookResult = ReturnType<typeof useReplaceInterestPointByIdMutation>;
export type ReplaceInterestPointByIdMutationResult = Apollo.MutationResult<ReplaceInterestPointByIdMutation>;
export type ReplaceInterestPointByIdMutationOptions = Apollo.BaseMutationOptions<ReplaceInterestPointByIdMutation, ReplaceInterestPointByIdMutationVariables>;
export const DeleteInterestPointByIdDocument = gql`
    mutation DeleteInterestPointById($interestPointId: String!) {
  deleteInterestPointById(interestPointId: $interestPointId)
}
    `;
export type DeleteInterestPointByIdMutationFn = Apollo.MutationFunction<DeleteInterestPointByIdMutation, DeleteInterestPointByIdMutationVariables>;

/**
 * __useDeleteInterestPointByIdMutation__
 *
 * To run a mutation, you first call `useDeleteInterestPointByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInterestPointByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInterestPointByIdMutation, { data, loading, error }] = useDeleteInterestPointByIdMutation({
 *   variables: {
 *      interestPointId: // value for 'interestPointId'
 *   },
 * });
 */
export function useDeleteInterestPointByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInterestPointByIdMutation, DeleteInterestPointByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInterestPointByIdMutation, DeleteInterestPointByIdMutationVariables>(DeleteInterestPointByIdDocument, options);
      }
export type DeleteInterestPointByIdMutationHookResult = ReturnType<typeof useDeleteInterestPointByIdMutation>;
export type DeleteInterestPointByIdMutationResult = Apollo.MutationResult<DeleteInterestPointByIdMutation>;
export type DeleteInterestPointByIdMutationOptions = Apollo.BaseMutationOptions<DeleteInterestPointByIdMutation, DeleteInterestPointByIdMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    color
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetInterestPointsDocument = gql`
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
}
    `;

/**
 * __useGetInterestPointsQuery__
 *
 * To run a query within a React component, call `useGetInterestPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInterestPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInterestPointsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInterestPointsQuery(baseOptions?: Apollo.QueryHookOptions<GetInterestPointsQuery, GetInterestPointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInterestPointsQuery, GetInterestPointsQueryVariables>(GetInterestPointsDocument, options);
      }
export function useGetInterestPointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInterestPointsQuery, GetInterestPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInterestPointsQuery, GetInterestPointsQueryVariables>(GetInterestPointsDocument, options);
        }
export function useGetInterestPointsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInterestPointsQuery, GetInterestPointsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInterestPointsQuery, GetInterestPointsQueryVariables>(GetInterestPointsDocument, options);
        }
export type GetInterestPointsQueryHookResult = ReturnType<typeof useGetInterestPointsQuery>;
export type GetInterestPointsLazyQueryHookResult = ReturnType<typeof useGetInterestPointsLazyQuery>;
export type GetInterestPointsSuspenseQueryHookResult = ReturnType<typeof useGetInterestPointsSuspenseQuery>;
export type GetInterestPointsQueryResult = Apollo.QueryResult<GetInterestPointsQuery, GetInterestPointsQueryVariables>;
export const GetInterestPointsByCityDocument = gql`
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
}
    `;

/**
 * __useGetInterestPointsByCityQuery__
 *
 * To run a query within a React component, call `useGetInterestPointsByCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInterestPointsByCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInterestPointsByCityQuery({
 *   variables: {
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useGetInterestPointsByCityQuery(baseOptions: Apollo.QueryHookOptions<GetInterestPointsByCityQuery, GetInterestPointsByCityQueryVariables> & ({ variables: GetInterestPointsByCityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInterestPointsByCityQuery, GetInterestPointsByCityQueryVariables>(GetInterestPointsByCityDocument, options);
      }
export function useGetInterestPointsByCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInterestPointsByCityQuery, GetInterestPointsByCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInterestPointsByCityQuery, GetInterestPointsByCityQueryVariables>(GetInterestPointsByCityDocument, options);
        }
export function useGetInterestPointsByCitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetInterestPointsByCityQuery, GetInterestPointsByCityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetInterestPointsByCityQuery, GetInterestPointsByCityQueryVariables>(GetInterestPointsByCityDocument, options);
        }
export type GetInterestPointsByCityQueryHookResult = ReturnType<typeof useGetInterestPointsByCityQuery>;
export type GetInterestPointsByCityLazyQueryHookResult = ReturnType<typeof useGetInterestPointsByCityLazyQuery>;
export type GetInterestPointsByCitySuspenseQueryHookResult = ReturnType<typeof useGetInterestPointsByCitySuspenseQuery>;
export type GetInterestPointsByCityQueryResult = Apollo.QueryResult<GetInterestPointsByCityQuery, GetInterestPointsByCityQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($data: NewUserInput!) {
  registerUser(data: $data)
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    name
    description
    color
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export function useGetCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetCategoriesSuspenseQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryByIdDocument = gql`
    query GetCategoryById($categoryId: String!) {
  getCategoryById(categoryId: $categoryId) {
    id
    name
    description
    color
  }
}
    `;

/**
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables> & ({ variables: GetCategoryByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export function useGetCategoryByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdSuspenseQueryHookResult = ReturnType<typeof useGetCategoryByIdSuspenseQuery>;
export type GetCategoryByIdQueryResult = Apollo.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: CategoryInput!) {
  createCategory(data: $data) {
    name
    description
    color
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const ReplaceCategoryByIdDocument = gql`
    mutation ReplaceCategoryById($data: UpdateCategoryInput!, $categoryId: String!) {
  replaceCategoryById(data: $data, categoryId: $categoryId) {
    id
    name
    description
    color
  }
}
    `;
export type ReplaceCategoryByIdMutationFn = Apollo.MutationFunction<ReplaceCategoryByIdMutation, ReplaceCategoryByIdMutationVariables>;

/**
 * __useReplaceCategoryByIdMutation__
 *
 * To run a mutation, you first call `useReplaceCategoryByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplaceCategoryByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replaceCategoryByIdMutation, { data, loading, error }] = useReplaceCategoryByIdMutation({
 *   variables: {
 *      data: // value for 'data'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useReplaceCategoryByIdMutation(baseOptions?: Apollo.MutationHookOptions<ReplaceCategoryByIdMutation, ReplaceCategoryByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplaceCategoryByIdMutation, ReplaceCategoryByIdMutationVariables>(ReplaceCategoryByIdDocument, options);
      }
export type ReplaceCategoryByIdMutationHookResult = ReturnType<typeof useReplaceCategoryByIdMutation>;
export type ReplaceCategoryByIdMutationResult = Apollo.MutationResult<ReplaceCategoryByIdMutation>;
export type ReplaceCategoryByIdMutationOptions = Apollo.BaseMutationOptions<ReplaceCategoryByIdMutation, ReplaceCategoryByIdMutationVariables>;
export const DeleteCategoryByIdDocument = gql`
    mutation DeleteCategoryById($categoryId: String!) {
  deleteCategoryById(categoryId: $categoryId)
}
    `;
export type DeleteCategoryByIdMutationFn = Apollo.MutationFunction<DeleteCategoryByIdMutation, DeleteCategoryByIdMutationVariables>;

/**
 * __useDeleteCategoryByIdMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryByIdMutation, { data, loading, error }] = useDeleteCategoryByIdMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useDeleteCategoryByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryByIdMutation, DeleteCategoryByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryByIdMutation, DeleteCategoryByIdMutationVariables>(DeleteCategoryByIdDocument, options);
      }
export type DeleteCategoryByIdMutationHookResult = ReturnType<typeof useDeleteCategoryByIdMutation>;
export type DeleteCategoryByIdMutationResult = Apollo.MutationResult<DeleteCategoryByIdMutation>;
export type DeleteCategoryByIdMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryByIdMutation, DeleteCategoryByIdMutationVariables>;
export const GetStatsDocument = gql`
    query GetStats {
  getUserCount
  getCityCount
  getPlaceCount
}
    `;

/**
 * __useGetStatsQuery__
 *
 * To run a query within a React component, call `useGetStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
      }
export function useGetStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
        }
export function useGetStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
        }
export type GetStatsQueryHookResult = ReturnType<typeof useGetStatsQuery>;
export type GetStatsLazyQueryHookResult = ReturnType<typeof useGetStatsLazyQuery>;
export type GetStatsSuspenseQueryHookResult = ReturnType<typeof useGetStatsSuspenseQuery>;
export type GetStatsQueryResult = Apollo.QueryResult<GetStatsQuery, GetStatsQueryVariables>;