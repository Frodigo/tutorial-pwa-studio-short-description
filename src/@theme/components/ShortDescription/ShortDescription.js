import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import RichText from '@magento/venia-ui/lib/components/RichText';

import classes from './ShortDescription.css';
import productOperations from './ShortDescription.gql';

import { shape, string } from 'prop-types';

const ShortDescription = props => {
    const { productSku } = props;
    const { queries } = productOperations;
    const { getShortDescriptionQuery } = queries;

    const { data } = useQuery(getShortDescriptionQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            productSku
        }
    });

    const shortDescription = useMemo(() => {
        if (!data) return null;

        const { products } = data;

        if (
            products &&
            products.items &&
            products.items.length &&
            products.items[0].short_description &&
            products.items[0].short_description.html &&
            products.items[0].short_description.html.length
        ) {
            return products.items[0].short_description.html;
        }

        return null;
    }, [data])

    const shouldRenderShortDescription = shortDescription ? <div className={classes.root}>
        <div className={classes.section}>
            <RichText content={shortDescription} />
        </div>
    </div> : null;

    return shouldRenderShortDescription;
};

export default ShortDescription;

ShortDescription.propTypes = {
    classes: shape({
        root: string,
        section: string
    }),
    productSku: string.isRequired
};
