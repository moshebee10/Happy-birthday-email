function checkCurrentWeek(dateString) {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let dateParts = dateString.split('/');
    let inputDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    inputDate.setHours(0, 0, 0, 0);

    let startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    let endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return inputDate >= startOfWeek && inputDate <= endOfWeek;
}

module.exports = {
    checkCurrentWeek: checkCurrentWeek
}
