const formatDate = (dateString) => {
    // format date to Oct 26, 2023
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default formatDate;