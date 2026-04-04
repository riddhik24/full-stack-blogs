const formatTime = (timeStamp) => {
  const messageDate = new Date(timeStamp);
  const hours = messageDate.getHours();
  const miniutes = messageDate.getMinutes();
  const formattedTime = `${hours}:${miniutes.toString().padStart(2, "0")}`;

  const now = new Date();

  const isToday = messageDate.toDateString() === now.toDateString;

  if (isToday) return formattedTime;

  return `${messageDate.toLocaleDateString()} ${formattedTime}`;
};

export default formatTime;
