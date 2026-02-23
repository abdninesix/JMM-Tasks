import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
query GetItems($search: String) {
    items (where: { itemNameEnglish: { contains: $search } }) {
        nodes {
        itemId
        itemNameEnglish
        category {
            categoryNameEnglish
        }
        wholeSellPrice
        costPrice
        barCode
        }
    }
}
`;

export const SERVICE_QUERY = gql`
query GetServices($search: String) {
  services (where: { serviceNameEnglish: { contains: $search } }) {
    nodes {
      serviceId
      serviceNameEnglish
      category {
        categoryNameEnglish
      }
      price
      costPrice
      barCode
    }
  }
}
`;