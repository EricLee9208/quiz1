function timeSince(timeStamp) {
  const now = new Date();
  const secondsPast = (now.getTime() - timeStamp) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + " seconds ago";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + " minutes ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + " hours ago";
  }
  if (secondsPast > 86400) {
    return parseInt(Math.floor(secondsPast / 86400)) + " days ago";
  }
}

const time = "2022-10-18T21:04:40.550Z";
const date = new Date(time); // becomes something like Jun 19 2022
const timestamp = date.getTime();
console.log(timestamp);

console.log(timeSince(timestamp));
