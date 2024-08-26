import { ReactNode, useState } from 'react';

import { faEllipsisV, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ActionsBlockOverlay from './ActionsBlockOverlay';

function ActionsBlock({
  availableActions,
}: {
  availableActions: {
    key?: string;
    text?: string;
    icon?: ReactNode;
    onClick?: () => unknown;
    disabled?: boolean;
  }[]
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <>
      {
        showActions && (
          <ActionsBlockOverlay onClose={toggleShowActions} />
        )
      }
      <div
        className="actions-block"
        style={{
          zIndex: showActions ? 3000 : 1029,
        }}
      >
        {
          showActions && (
            <ul className="actions-block__list">
              {
                availableActions.map((action) => {
                  const {
                    key,
                    icon,
                    text,
                    onClick,
                    disabled,
                  } = action;

                  return (
                    <li key={`actions-block__item-${key}`} className="actions-block__item">
                      <button
                        className="actions-block__action-button"
                        type="button"
                        disabled={disabled}
                        onClick={() => onActionClick(onClick)}
                      >
                        <span className="actions-block__action-title">
                          {text}
                        </span>
                        {icon && <span className="actions-block__action-icon">{icon}</span>}
                      </button>
                    </li>
                  );
                })
              }
              {
                !availableActions.length && (
                  <li className="actions-block__item">
                    <span className="actions-block__no-actions">
                      no actions
                    </span>
                  </li>
                )
              }
            </ul>
          )
        }
        <button
          type="button"
          className="actions-block__toggler"
          onClick={toggleShowActions}
        >
          {
            showActions ? (
              <FontAwesomeIcon
                fixedWidth
                icon={faTimes}
                className="actions-block__icon"
              />
            ) : (
              <>
                <FontAwesomeIcon
                  fixedWidth
                  icon={faChevronDown}
                  className="actions-block__icon actions-block__icon--desktop"
                />
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className="actions-block__icon actions-block__icon--mobile"
                />
              </>
            )
          }
          <span className="actions-block__toggler-text">Actions</span>
        </button>
      </div>
    </>
  );

  function onActionClick(onClick: Function | undefined) {
    toggleShowActions();
    if (onClick) onClick();
  }

  function toggleShowActions() {
    setShowActions(!showActions);
  }
}

export default ActionsBlock;
