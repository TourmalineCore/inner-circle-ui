import ContactLink from '../../../../components/ContactLink/ContactLink';

function InfoComponent({ value, icon, link }: { value: string | null, icon?:JSX.Element, link: string | null }) {
  const linkValidity = link || undefined;
  return (
    <div className="info-component">
      {icon && (
        <div className="info-component__icon">
          { icon }
        </div>
      )}
      <div className="info-component__value">
        <ContactLink contact={value} link={linkValidity} />
      </div>
    </div>
  );
}

export default InfoComponent;
