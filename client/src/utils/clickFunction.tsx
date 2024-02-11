import { useNavigate } from "react-router-dom";

export function handleClickBreadcrumbs(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  route: any
) {
  const navigate = useNavigate();
  event.preventDefault();
  navigate(route);
}
export const handleClickAction = (
  event: React.MouseEvent<HTMLButtonElement>,
  setAnchorEl: any
) => {
  setAnchorEl(event.currentTarget);
};
