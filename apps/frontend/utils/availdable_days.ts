function generateDatePaths() {
    const start = new Date('2022-02-24');
    const end = new Date();
    const dates = [];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        dates.push(date.toISOString().split('T')[0]);  // 'YYYY-MM-DD' format
    }

    return dates;
}

const AVAILABLE_DATES = generateDatePaths()

export default AVAILABLE_DATES