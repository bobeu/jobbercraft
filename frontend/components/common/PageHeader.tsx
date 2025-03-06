import { Breadcrumbs, Typography, Link, Toolbar,} from "@mui/material";
import clsx from "clsx";
import { Icon as ICIcon } from "@iconify/react";

/**
 *
 * @param {PageHeaderProps} props
 */
function PageHeader(props: PageHeaderProps) {
  const {
    title,
    className,
    breadcrumbs,
    children,
    classes,
    beforeTitle,
    ...rest
  } = props;
  return (
    <>
      <Toolbar
        disableGutters
        className={clsx("flex gap-2 items-center flex-wrap py-4", className, classes?.root)}
        {...rest}
      >
        <div>
          <div>
            {beforeTitle}
            <Typography
              variant="h4"
              className={clsx("font-bold", classes?.title)}
            >
              {title}
            </Typography>
            <div className={clsx("hidden md:contents", classes?.rootContent)}>
              {children}
            </div>
          </div>

          <div>
            {!!breadcrumbs.length && (
              <Breadcrumbs
                className="mt-4"
                separator={<ICIcon icon="ci:dot-02-s" />}
              >
                {breadcrumbs.map((breadcrumb, key) => {
                  const isPage = key === breadcrumbs.length - 1;

                  if (isPage) {
                    return (
                      <Typography
                        key={key}
                        variant="body2"
                        className="capitalize text-gray-400"
                      >
                        {breadcrumb.name}
                      </Typography>
                    );
                  }

                  return (
                    <Link
                      key={key}
                      sx={{
                        color: "#212B36",
                      }}
                      component={Link}
                      href={breadcrumb.to || "#"}
                    >
                      {breadcrumb.name}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            )}
          </div>
        </div>
      </Toolbar>
      {!!children && (
        <Toolbar
          disableGutters
          className={clsx("flex gap-4 items-center md:hidden mb-2 py-4", classes?.content)}
        >
          {children}
        </Toolbar>
      )}
    </>
  );
}

PageHeader.defaultProps = {
  breadcrumbs: [],
  classes: {},
};

export default PageHeader;

type PageHeaderProps = {
  breadcrumbs: { name: string; to: string; }[];
  classes: { root: string; title: string; content: string; rootContent: string; };
  beforeTitle: import("react").ReactNode;
} & import("react").ComponentPropsWithoutRef<'div'>;
