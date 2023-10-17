function formatDate(date: string) {
  const separatedDate = date?.split("T")[0].split("-");
  const newFormatedDate = separatedDate.reverse().join("/");
  return newFormatedDate;
}

export default formatDate;
