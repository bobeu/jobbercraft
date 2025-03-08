// import Blockies from "react-blockies";
// import { zeroAddress } from "viem";

// interface BlockieProp {
//   account: string;
//   size?: number;
// }

export const blockie = ({account, size} : {account: string, size?: number}) => {
  return `${account.substring(0, size || 4)}... ${account.substring(account.length - (size || account.length), account.length)}`
}
