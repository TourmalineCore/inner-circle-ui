function SingleComponent({ value, description }:{ value: string, description: string }) {
  return (
    <div>
      <div>{description}</div>
      <div>{value}</div>
    </div>
  );
}

export default SingleComponent;
