export const getClassNames = (name, sorting) => {
    if (!sorting) {
        return;
    }
    return sorting.key === name ? sorting.direction : "";
};
