import {useMemo, useState} from "react";

export const useSorting = (items, config = null) => {
    const [sorting, setSorting] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sorting !== null) {
            sortableItems.sort((a, b) => {
                if (Number(a[sorting.key]) && Number(b[sorting.key])){
                    if (Number(a[sorting.key]) < Number(b[sorting.key])) {
                        return sorting.direction === 'ascending' ? -1 : 1;
                    }
                    if (Number(a[sorting.key]) > Number(b[sorting.key])) {
                        return sorting.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                } else if (sorting.key === "date" || sorting.key === "birthday") {
                    if (new Date(a[sorting.key]) < new Date(b[sorting.key])) {
                        return sorting.direction === 'ascending' ? -1 : 1;
                    }
                    if (new Date(a[sorting.key]) > new Date(b[sorting.key])) {
                        return sorting.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                } else {
                    if (a[sorting.key] < b[sorting.key]) {
                        return sorting.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sorting.key] > b[sorting.key]) {
                        return sorting.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                }
            });
        }
        return sortableItems;
    }, [items, sorting]);

    const requestSort = key => {
        let direction = 'ascending';
        if (sorting && sorting.key === key && sorting.direction === 'ascending') {
            direction = 'descending';
        }
        setSorting({ key, direction });
    }

    return { items: sortedItems, requestSort };
}