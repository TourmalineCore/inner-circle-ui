import './AuthorizationEllipsis.css';

function AuthorizationEllipsis({ x, y }:{ x: string, y: string }) {
  return (
    <div
      className="authorization-ellipsis"
      style={{
        left: x,
        bottom: y,
      }}
    />
  );
}

export default AuthorizationEllipsis;
