import ProfilePicture from "../components/profilePicture";

const Profile = () => {
  return (
    <div>
      <ProfilePicture />
      <fieldset className="fieldset bg-base-200 rounded-xl border-base-300 rounded-box w-xs border p-4 m-auto mt-4 ">
        <legend className="fieldset-legend">Update Profile</legend>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input rounded-xl"
          placeholder="My awesome page"
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input rounded-xl"
          placeholder="my-awesome-page"
        />

        <label className="label text-l">Email</label>
        <input type="text" className="input rounded-xl" placeholder="Email" />
      </fieldset>
    </div>
  );
};

export default Profile;
