import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
query GetItems($search: String) {
    items (where: { itemNameEnglish: { contains: $search } }) {
        nodes {
          itemId
          taxId
          itemNameEnglish
          costPrice
          wholeSellPrice
          barCode
          category {
            categoryNameEnglish
          }
          itemUnitOfMeasure {
            nameEnglish
            unitId
          }
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

export const CUSTOMER_QUERY = gql`
query GetCustomers {
  customers {
    nodes {
      id
      nameEnglish
      nameArabic
      contact
      email
      creditAmountLimit
      vATNo
      invoicesCount
    }
  }
}
`;