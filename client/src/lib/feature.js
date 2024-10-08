import moment from "moment";

const fileFormat = (url = "") => {
  const fileExt = url?.split(".").pop();
  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";
  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

const transformImage = (url = "", width = 100) => {
  const newUrl = url?.replace("upload/", `upload/q_100/dpr_auto/w_${width}/`);
  return newUrl;
};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }

  return last7Days;
};

const getAddress = (data) => {
  const formattedAddress = [
    data?.house_number,
    data?.road,
    data?.neighbourhood,
    data?.suburb,
    data?.city,
    data?.state,
    data?.postcode,
    data?.country,
  ]
    .filter(Boolean)
    .join(", ");
  return formattedAddress;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  }

  localStorage.setItem(key, JSON.stringify(value));
};

export {
  fileFormat,
  transformImage,
  getLast7Days,
  getOrSaveFromStorage,
  getAddress,
};
