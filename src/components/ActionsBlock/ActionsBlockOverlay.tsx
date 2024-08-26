import { useEffect, useCallback } from 'react';

const BODY_CLASSNAME = 'is-actions-overlay-opened';

function ActionsBlockOverlay({
  onClose,
}: {
  onClose: () => void;
}) {
  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add(BODY_CLASSNAME);
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.documentElement.classList.remove(BODY_CLASSNAME);
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <div
      className="actions-block-overlay"
      onClick={onClose}
      onKeyPress={onClose}
      role="button"
      tabIndex={0}
    />
  );
}

export default ActionsBlockOverlay;
