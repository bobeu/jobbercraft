import { Suspense as ReactSuspense } from "react";
import LoadingIndicator from "./LoadingIndicator";

function Suspense(props: import('react').SuspenseProps) {
  return <ReactSuspense {...props} />;
}

Suspense.defaultProps = {
  fallback: (
    <div className="flex justify-center items-center p-8">
      <LoadingIndicator />
    </div>
  ),
};

export default Suspense;
