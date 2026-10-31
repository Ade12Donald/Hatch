import Image from "./Image.jsx";

const Avatar = ({ firstName, lastName }) => {
  return (
    <Image
      fetchOwn
      firstName={firstName}
      lastName={lastName}
      className="ring-2 ring-base-200 ring-offset-2 ring-offset-base-100"
    />
  );
};

export default Avatar;
