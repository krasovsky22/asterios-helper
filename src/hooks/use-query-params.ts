import { useLocation } from "react-router-dom";
import * as QueryString from "query-string";

export default function useQueryParams() {
  const { search } = useLocation();

  const params = QueryString.parse(search);

  return params;
}
