import { observer } from 'mobx-react-lite';

export const ContactsInfoButton = observer(({
  onClick,
  text,
} : {
  onClick: () => unknown,
  text: string,
}) => (
  <button
    type="button"
    className="button"
    data-cy="button"
    onClick={onClick}
  >
    {text}
  </button>
));
