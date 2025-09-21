import { Link } from 'react-router-dom';
import './Button.css';

type ButtonProps = {
  label: string;
  to?: string;
  bgColor?: boolean;
  onClick?: () => void;
};

export const Button = ({ label, to, bgColor, onClick }: ButtonProps) => {
  const buttonClass = `button ${bgColor ? 'purple' : ''}`;
  if (to) {
    return <Link to={to} className={buttonClass}>{label}</Link>;
  }
  return <button className={buttonClass} onClick={onClick}>{label}</button>;
};
