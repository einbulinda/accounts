export const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

// Format with separating commas
export const formatVal = (value) => value.toLocaleString("en-US");

// find end date of month
export const endMonth = (month, year) => {
  const leapYear = Boolean(
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  );
  let monthEnds = null;
  if (month === 1 || 3 || 5 || 7 || 8 || 10 || 12) {
    monthEnds = "31st";
  } else if (month === 4 || 6 || 9 || 10) {
    monthEnds = "30th";
  } else {
    if (leapYear) {
      monthEnds = "29th";
    }
    monthEnds = "28th";
  }

  return monthEnds;
};
