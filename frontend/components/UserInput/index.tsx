import * as React from 'react';
import { Input, InputProps } from '@mui/base/Input';
import clsx from 'clsx';

type UserInputProps = {
  placeholder: string;
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

export const UserInputBase = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      className={props.className}
      slotProps={{
        ...props.slotProps,
        input: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'w-[fit-content] text-sm font-normal font-sans leading-5 px-3 py-2 shadow-xs shadow-gray-100 focus:shadow-cyan-100 focus:shadow-sm hover:border-cyan-200 focus:border-purple-500 bg-transparent text-cyan-700 focus-visible:outline-0',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});
