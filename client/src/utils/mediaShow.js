export const imageShow = (src) => {
  return (
    <img
      src={src}
      className="img-thumbnail"
      alt="upload"
    />
  );
};

export const videoShow = (src) => {
  return (
    <video
      controls
      src={src}
      className="img-thumbnail"
      alt="upload"
    />
  );
};
