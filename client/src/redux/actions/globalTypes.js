export const GLOBALTYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  THEME: "THEME",
  STATUS: "STATUS",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  EDIT_PROFILE: "EDIT_PROFILE",
  MODAL: "MODAL",
  USER_TYPE: "USER_TYPE",
  SOCKET: "SOCKET",
  SEARCH: "SEARCH",
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};

