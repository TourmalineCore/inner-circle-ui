import Skeleton from 'react-loading-skeleton';

export function ProfileSkeleton({
  count = 4,
  id,
} : {
  count?: number,
  id: string,
}) {
  return (
    <div data-cy="skeleton">
      <Skeleton
        className="skeleton"
        count={count}
        containerTestId={id}
      />
    </div>
  );
}
