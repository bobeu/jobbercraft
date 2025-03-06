import Blockies from "react-blockies";

export const ZERO_ADDR = `0x${'0'.repeat(40)}`;

interface BlockieProp {
  account: string;
  size?: number;
}

export const Blockie = (props: BlockieProp) => {
  const { account, size } = props;

  return (
    <Blockies
      seed={account?.toLowerCase() || ZERO_ADDR}
      size={size || 4}
      scale={3}
    />
  );
}
