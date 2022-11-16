import './ProfileInfo.css';

function ProfileInfo({ rows } : { rows : any[] }) {
  return (
    <div className="profile-info">
      {rows}
    </div>
  );
}

export default ProfileInfo;
