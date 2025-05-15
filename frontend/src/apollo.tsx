import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider as Provider,
} from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider client={client}>{children}</Provider>;
};
