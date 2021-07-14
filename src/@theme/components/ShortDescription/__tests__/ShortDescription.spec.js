import React from 'react';
import { render, getByText } from '@testing-library/react';
import { useQuery } from '@apollo/client';

import ShortDescription from '../ShortDescription';

jest.mock('@apollo/client');

test('It renders component when the short description is filled in a product', () => {
    useQuery.mockReturnValue({
        data: {
            products: {
                items: [
                    {
                        uid: '1',
                        short_description: {
                            html: '<p>Lorem ipsum</p>'
                        }
                    }
                ]
            }
        }
    });

    const { container } = render(
        <ShortDescription productSku="abc"/>
    );

    expect(getByText(container, 'Lorem ipsum')).toBeDefined();
    expect(container).toMatchSnapshot();
});


test('It does not render when a product does not have the short description', () => {
    useQuery.mockReturnValue({
        data: {
            products: {
                items: [
                    {
                        uid: '1',
                        short_description: {
                            html: ''
                        }
                    }
                ]
            }
        }
    });

    const { container } = render(
        <ShortDescription productSku="abc"/>
    );

    expect(container.firstChild).toBeNull();
});
