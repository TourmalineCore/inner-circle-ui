import './ProfileInfo.css';

function ProfileInfo({ rows, buttons } : { rows : any[], buttons: any[] }) {
  return (
    <>
      <div className="profile-info">
        {rows}
      </div>
      <div className="profile-btns">
        {buttons}
      </div>
    </>
  );
}

export default ProfileInfo;
