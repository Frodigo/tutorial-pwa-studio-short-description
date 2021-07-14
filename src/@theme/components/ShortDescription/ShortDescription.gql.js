import gql from 'graphql-tag';

const GET_SHORT_DESCRIPTION_QUERY = gql`
    query shortDescriptionOfProduct($productSku: String!) {
        products(filter: { sku: { eq: $productSku } }) {
            items {
                uid
                short_description {
                    html
                }
            }
        }
    }
`;

export default {
    queries: {
        getShortDescriptionQuery: GET_SHORT_DESCRIPTION_QUERY
    },
    mutations: {}
};
