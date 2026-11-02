import Image from "./Image.jsx";

const Avatar = ({ firstName, lastName, size, settings = true }) => {
  return (
    <Image
      fetchOwn
      firstName={firstName}
      lastName={lastName}
      size={size}
      settings={settings}
      className="ring-2 ring-base-200 ring-offset-2 ring-offset-base-100"
    />
  );
};

export default Avatar;
