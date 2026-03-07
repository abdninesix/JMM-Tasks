import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password ) {
      token
      userName
      userId
    }
  }
`;

export const CREATE_INVOICE_MUTATION = gql`
  mutation addSaleInvoice($input: CreateSaleInvoiceCommandInput!) {
    addSaleInvoice(input: $input)
  }
`;