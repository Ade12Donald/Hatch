import { useNavigate } from "react-router";
import Image from "./Image";
import { ChevronLeft, Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const ProfilePicture = () => {
  const navigate = useNavigate();
  const editModalRef = useRef(null);
  const expandRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  // Load the saved picture (Profile owns the URL so it can enlarge it)
  useEffect(() => {
    let ignore = false;

    const loadPhoto = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/profile-picture",
          { withCredentials: true },
        );
        if (!ignore) setPhoto(res.data.profilePicture);
      } catch (err) {
        console.log(err.response?.status, err.response?.data);
      }
    };

    loadPhoto();

    return () => {
      ignore = true;
    };
  }, []);

  // Only builds the preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPreview(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      e.target.value = "";
      setPreview(null);
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  // Does the upload
  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("profilePicture");
    if (!file || file.size === 0) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/user/profile-picture",
        formData,
        { withCredentials: true },
      );
      setPhoto(res.data.profilePicture.url);
      setShowSuccess(true);
      editModalRef.current.close();
    } catch (err) {
      console.log(err.response?.status, err.response?.data);
      setErrors({
        form: err.response
          ? err.response.data?.message || "Something went wrong"
          : "Can't reach the server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Releases the old link when a new file is picked or the component goes away
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Hides the success toast after 10 seconds
  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => setShowSuccess(false), 10000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <div>
      <div>
        <button
          className="btn rounded-3xl border-0 bg-base-100 hover:bg-base-300"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
          Back
        </button>
      </div>

      <div className="flex gap-2 items-center flex-col mt-4">
        <div className="flex flex-row">
          {/* Click the avatar to view it larger */}
          <button
            type="button"
            aria-label="View larger photo"
            disabled={!photo}
            className="rounded-full cursor-zoom-in disabled:cursor-default"
            onClick={() => expandRef.current?.showModal()}
          >
            <Image
              photo={photo}
              firstName="Asher"
              lastName="Ace"
              size="w-24"
              textSize="text-4xl"
              settings={false}
              className="ring-2 ring-base-200 ring-offset-2 ring-offset-base-100"
            />
          </button>

          <div
            role="button"
            tabIndex={0}
            aria-label="Edit profile picture"
            className="cursor-pointer"
            onClick={() => editModalRef.current.showModal()}
          >
            <Pencil size={16} className="hover:size-5" />
          </div>
        </div>

        <div>
          <div className="badge badge-ghost text-center opacity-70 rounded-2xl p-2">
            Profile Picture
          </div>
        </div>
      </div>

      {/* Edit popup */}
      <div>
        <dialog
          ref={editModalRef}
          className="modal backdrop-blur-sm"
          onClose={() => {
            document.activeElement?.blur();
            setPreview(null);
            setErrors({});
          }}
        >
          <div className="modal-box">
            {/* Form 1: only closes the modal */}
            <form method="dialog">
              <button
                aria-label="Close"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                <X size={18} />
              </button>
            </form>

            <h3 className="font-bold text-lg mb-4">Edit Profile Picture</h3>

            {/* Form 2: saves the data */}
            <form onSubmit={handleSave} onReset={() => setPreview(null)}>
              <div className="p-5">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Pick a file</legend>
                  <input
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    className="file-input"
                    onChange={handleFileChange}
                  />
                  <label className="label">Max size 5MB</label>
                </fieldset>

                {preview && (
                  <div className="avatar mt-4">
                    <div className="w-24 rounded-full ring-2 ring-base-200 ring-offset-2 ring-offset-base-100">
                      <img src={preview} alt="Selected profile preview" />
                    </div>
                  </div>
                )}
              </div>

              {errors.form && (
                <p className="text-error text-sm mb-2">{errors.form}</p>
              )}

              <button
                className="btn rounded-3xl bg-base-100 hover:bg-base-300"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="reset"
                className="btn rounded-3xl ml-2 bg-base-100 hover:bg-base-300"
              >
                Reset
              </button>
            </form>
          </div>

          {/* click the dark area to close */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      {/* Expanded photo view */}
      {photo && (
        <dialog
          ref={expandRef}
          className="modal backdrop-blur-sm"
          onClose={() => document.activeElement?.blur()}
        >
          <div className="modal-box w-auto max-w-3xl p-2">
            <img
              src={photo}
              alt="Profile picture"
              className="mx-auto max-h-[80vh] w-auto rounded-box"
            />
          </div>

          {/* click the dark area to close */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}

      {showSuccess && (
        <div className="toast toast-bottom toast-center">
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Profile picture updated</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
