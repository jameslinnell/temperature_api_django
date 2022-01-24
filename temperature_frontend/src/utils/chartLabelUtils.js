const hours = [0, 4, 8, 12, 16, 20];

export const calculateLabel = (hour, minute) => parseInt(minute) >= 0 && parseInt(minute) < 10 ? `${hour}:00` : "";

export const calculateLabel_no_limit = (hour, minute) => hours.includes(parseInt(hour)) ? calculateLabel(hour, minute) : "";
