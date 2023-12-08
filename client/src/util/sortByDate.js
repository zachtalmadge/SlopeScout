function sortByDate(objects) {
    return objects.sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA - dateB;
    });
}

export default sortByDate