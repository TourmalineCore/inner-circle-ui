import './InfoComponent.css';
import { Input } from '@tourmalinecore/react-tc-ui-kit';

function InfoComponent({
  value,
  isRedact = false,
  label,
  onChange,
} :
{ value: string,
  isRedact?: boolean,
  label? : string,
  onChange? : (e: React.ChangeEvent<HTMLInputElement>)=>void
}) {
  return (
    <div className="info-component">
      {isRedact
        ? (
          <Input
            className="info-component-input"
            value={value}
            label={label}
            onChange={onChange}
          />
        ) : <label>{value}</label>}
    </div>
  );
}

export default InfoComponent;
