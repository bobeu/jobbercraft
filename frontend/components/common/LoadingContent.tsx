import { ReactNode, useEffect } from "react";
import useDataRef from "../hooks/useDataRef";
import LoadingIndicator from "./LoadingIndicator";
import ErrorContent from "./ErrorContent";

type LoadingContentProps = {
  size?: string | number;
  onMount?: Function;
  onReload?: Function;
  error?: boolean;
  loading?: boolean;
  errorContent?: ReactNode | Function;
  loadingContent?: ReactNode | Function;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

LoadingContent.defaultProps = {
  size: 40,
  children: null,
};

function LoadingContent(props: LoadingContentProps) {
  const {
    size,
    error,
    loading,
    children,
    onReload,
    onMount,
    className,
    errorContent,
    loadingContent,
    ...rest
  } = props;

  const dataRef = useDataRef({ onReload, onMount });

  useEffect(() => {
    dataRef.current.onMount?.();
  }, [dataRef]);

  if (!loading && !error) {
    return children;
  }

  const defaultLoadingContent = <LoadingIndicator size={size} />;
  const defaultErrorContent = <ErrorContent onTryAgain={() => onReload?.()} />;

  return (
    <div className="flex flex-col justify-center items-center p-4" {...rest}>
      {error ? (
        <>
          {errorContent
            ? typeof errorContent === "function"
              ? errorContent(defaultErrorContent)
              : errorContent
            : defaultErrorContent}
        </>
      ) : loadingContent ? (
        typeof loadingContent === "function" ? (
          loadingContent(defaultLoadingContent)
        ) : (
          loadingContent
        )
      ) : (
        defaultLoadingContent
      )}
    </div>
  );
}

LoadingContent.defaultProps = {
  size: 40,
  children: null,
};

export default LoadingContent;
