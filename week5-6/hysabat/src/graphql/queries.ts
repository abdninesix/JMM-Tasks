import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
query {
    items {
        nodes {
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