import './ProfileButton.css';
import { Button } from '@tourmalinecore/react-tc-ui-kit';

function ProfileButton({ value, onClick }:{ value : string, onClick: ()=>void }) {
  return (
    <div className="profile-bt">
      <Button
        type="button"
        onClick={onClick}
      >
        {value}
      </Button>
    </div>
  );
}
export default ProfileButton;
