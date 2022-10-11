import { ReactNode } from 'react';

function CustomHeading({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="custom-heading">{children}</div>
  );
}

export default CustomHeading;
