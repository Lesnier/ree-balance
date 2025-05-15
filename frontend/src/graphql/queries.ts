import { gql } from '@apollo/client';

export const GET_ENERGY_BY_DATE_RANGE = gql`
    query GetEnergyByDateRange($startDate: String!, $endDate: String!) {
        getEnergyByDateRange(range: { startDate: $startDate, endDate: $endDate }) {
            category
            subcategory
            value
            datetime
        }
    }
`;
