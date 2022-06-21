import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ containerClass = '' }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        renderPagination()
    }, [])

    const renderPagination = () => {
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === 1}>
                    {number}
                </Pagination.Item>,
            );
        }

        setPages(items);
    }

    return (
        <Pagination className={`custom-pagination-container ${containerClass}`}>
            {pages}
        </Pagination>
    );
};

export default CustomPagination;