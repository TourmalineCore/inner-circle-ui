import './ProfileButton.css';

function ProfileButton({ value, onClick }:{ value : string, onClick: ()=>void }) {
  return (
    <div className="profile-bt">
      <button type="button" onClick={onClick}>{value}</button>
    </div>
  );
}
export default ProfileButton;
