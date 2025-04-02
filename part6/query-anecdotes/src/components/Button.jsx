import { useContext } from "react";
import NotifyContext from "../NotifyContext";

const Button = ({ type, label, func }) => {
  const [notification, dispatch] = useContext(NotifyContext);
  return (
    <button
      onClick={() => {
        dispatch({ type });
        func();
      }}
    >
      vote
      {label}
    </button>
  );
};

export default Button