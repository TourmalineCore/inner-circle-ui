import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const CopyToClipboardButton = observer(({
  text,
  notificationPosition,
}: {
  text: string;
  notificationPosition: string;
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={`copy-item--${notificationPosition}`}
      data-cy="copy-item"
    >
      <CopyToClipboard
        text={text}
        onCopy={handleCopy}
        data-cy="copy-text"
      >
        <span
          title="click to email to copy it"
          className="copy-item__text"
        >
          {text}
        </span>
      </CopyToClipboard>

      {copied && (
        <span
          className={`copy-item__notification copy-item__notification--${notificationPosition}`}
          data-cy="copy-notification"
        >
          Copied!
        </span>
      )}
    </div>
  );

  function handleCopy() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  }
});
