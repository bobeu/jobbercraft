import {Button, Typography, Icon} from '@mui/material';
import clsx from 'clsx';
// import ErrorContentImg from "assets/images/ErrorContent.png";
import useLogout from '../hooks/useLogout';
import { IllustrationEmptyContent } from "../assets";

type ErrorContentProps = {
  title: string; 
  description: string; 
  className?: string; 
  onTryAgain: () => void;
  paperProps?: import("@mui/material").PaperProps;
}

function ErrorContent (props: ErrorContentProps) {
  const {title, description, className, onTryAgain, ...rest } = props;

  const {logout} = useLogout ();

  return (
    <div className="flex flex-col items-center p-4" { ...rest }>
      <Typography variant="h6" className="font-bold text-center">
        {title}
      </Typography>
      <div>
        <Icon fontSize="medium" className="text-cyan-900 font-semibold">
          sentiment_dissatisfied
        </Icon>
        <IllustrationEmptyContent />
        {/* <img src={ErrorContentImg} alt="ErrorContent" width={100} /> */}
      </div>
      <Typography
        variant="body2"
        // color="secondary"
        className="text-center mb-4 font-bold"
      >
        {description}
      </Typography>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outlined" onClick={() => logout ()}>
          Send Report
        </Button>
        <Button onClick={onTryAgain}>Try Again</Button>
      </div>
    </div>
  );
}

ErrorContent.defaultProps = {
  title: 'Oops! Something went wrong',
  description: "Please try again or Refresh",
  elevation: 0,
};

export default ErrorContent;
