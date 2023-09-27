/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Car */
export type Car = {
  __typename?: 'Car';
  color: Scalars['String']['output'];
  firstRegistrationDate?: Maybe<Scalars['DateTime']['output']>;
  gearBox: GearBoxes;
  manufacturer: Scalars['String']['output'];
  mielage: Scalars['Float']['output'];
  modelDetails: Scalars['String']['output'];
  vin: Scalars['ID']['output'];
};

export type CarInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  firstRegistrationDate?: InputMaybe<Scalars['DateTime']['input']>;
  gearBox?: InputMaybe<GearBoxes>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  mielage?: InputMaybe<Scalars['Float']['input']>;
  modelDetails?: InputMaybe<Scalars['String']['input']>;
  vin: Scalars['String']['input'];
};

export enum GearBoxes {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL',
  Other = 'OTHER'
}

export type Mutation = {
  __typename?: 'Mutation';
  updateCar: Car;
};


export type MutationUpdateCarArgs = {
  input: CarInput;
};

export type Query = {
  __typename?: 'Query';
  car: Array<Car>;
  cars: Array<Car>;
};


export type QueryCarArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  firstRegistrationDate?: InputMaybe<Scalars['DateTime']['input']>;
  gearBox?: InputMaybe<GearBoxes>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  mielage?: InputMaybe<Scalars['Float']['input']>;
  modelDetails?: InputMaybe<Scalars['String']['input']>;
  vin?: InputMaybe<Scalars['String']['input']>;
};

export type GetCarListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarListingsQuery = { __typename?: 'Query', cars: Array<{ __typename: 'Car', vin: string, manufacturer: string, modelDetails: string, gearBox: GearBoxes, color: string, mielage: number, firstRegistrationDate?: any | null }> };

export type UpdateCarMutationVariables = Exact<{
  input: CarInput;
}>;


export type UpdateCarMutation = { __typename?: 'Mutation', updateCar: { __typename: 'Car', vin: string, manufacturer: string, modelDetails: string, gearBox: GearBoxes, color: string, mielage: number, firstRegistrationDate?: any | null } };


export const GetCarListingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCarListings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"modelDetails"}},{"kind":"Field","name":{"kind":"Name","value":"gearBox"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"mielage"}},{"kind":"Field","name":{"kind":"Name","value":"firstRegistrationDate"}}]}}]}}]} as unknown as DocumentNode<GetCarListingsQuery, GetCarListingsQueryVariables>;
export const UpdateCarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CarInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"vin"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"modelDetails"}},{"kind":"Field","name":{"kind":"Name","value":"gearBox"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"mielage"}},{"kind":"Field","name":{"kind":"Name","value":"firstRegistrationDate"}}]}}]}}]} as unknown as DocumentNode<UpdateCarMutation, UpdateCarMutationVariables>;