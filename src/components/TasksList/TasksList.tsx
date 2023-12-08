import { Link } from "react-router-dom";

export default function TasksList() {
  return (
    <>
      <h2>Problems:</h2>
      <ul>
        <li>
          <Link to="problem/1"> Problem 1 </Link>
        </li>

        <li>
          <Link to="problem/2"> Problem 2 </Link>
        </li>

        <li>
          <Link to="problem/2"> Problem 3 </Link>
        </li>
      </ul>
    </>
  );
}
