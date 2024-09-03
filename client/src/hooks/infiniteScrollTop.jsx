import { useEffect, useState } from "react";

const useInfiniteScrollTop = (containerRef, totalPages, page, setPage, messages) => {
    const data = messages || [];

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            if(container.scrollTop === 0 && page < totalPages) {
                setPage(prev => prev + 1);
            }
        };

        if(container !== null) container.addEventListener('scroll', handleScroll);

        return () => {
            if(container !== null) container.removeEventListener('scroll', handleScroll);
        }
    }, [page,containerRef, totalPages, setPage]);

    const setData = (newData) => {
        data.push(...newData);
    };
    
    return { data, setData };
}

export default useInfiniteScrollTop