type StatusProps = {
  status: "success" | "Loading" | "error";
};

const Status = (props: StatusProps) => {
  let message;
  if (props.status == "success") {
    message = "success";
  } else if (props.status == "Loading") {
    message = "Loading";
  } else if (props.status == "error") {
    message == "error";
  }
  return <div>status - {message}</div>;
};

export default Status;
