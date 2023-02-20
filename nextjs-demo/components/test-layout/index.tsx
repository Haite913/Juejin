
import { FC } from "react";
// export const Test:FC<{children:JSX.Element}> =({children}) =>{
//   return (
//     <div >
//       <h1>下面是children </h1>
//       <main>{children}</main>
//     </div>
//   );
// }
export interface ITestBarProps {}

export const Test:FC<ITestBarProps &{children:JSX.Element}> =({children}) =>{
  return (
    <div >
      <h1>下面是children</h1>
      <main>{children} </main>
    </div>
  );
}
