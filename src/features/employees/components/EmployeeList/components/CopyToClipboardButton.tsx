import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const CopyToClipboardButton = observer(({ text, notificationPosition }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className={`copy-item--${notificationPosition}`}>
      <CopyToClipboard
        text={text}
        onCopy={handleCopy}
      >
        <span title="click to email to copy it" className="copy-item__text">{text}</span>
      </CopyToClipboard>

      {copied && (
        <span className={`copy-item__notification copy-item__notification--${notificationPosition}`}>Copied!</span>
      )}
    </div>
  );
});
