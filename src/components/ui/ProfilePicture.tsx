import profilePic from "../../assets/profilepicture.jpg";

function ProfilePicture() {
    return (
<div className="w-56 h-56 md:w-72 md:h-72 shrink-0 rounded-full overflow-hidden border-4 border-zinc-700/80 shadow-2xl">
      <img
        src={profilePic}
        alt="Christopher Pham"
        className="w-full h-full object-cover"
      />
    </div>
    );
}
export default ProfilePicture;
