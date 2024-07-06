// import { ConnectButton } from "@rainbow-me/rainbowkit";

// export const WalletConnect = () => {
//     return (
//         <ConnectButton.Custom>
//             {
//                 ({
//                     account,
//                     chain,
//                     openAccountModal,
//                     openChainModal,
//                     openConnectModal,
//                     authenticationStatus,
//                     mounted,
//                 }) => {
//                     const ready = mounted && authenticationStatus !== 'loading';
//                     const connected =
//                                     ready &&
//                                     account &&
//                                     chain &&
//                                     (!authenticationStatus ||
//                                         authenticationStatus === 'authenticated');

//                     return (
//                         <div
//                             {...(!ready && {
//                                 'aria-hidden': true,
//                                 'style': {
//                                 opacity: 0,
//                                 pointerEvents: 'none',
//                                 userSelect: 'none',
//                                 },
//                                 })}
//                         >
//                             {
//                                 (() => {
//                                     return (<div></div>)
//                                 })
//                             }
//                         </div>
//                     )
//                 }
//             }
//         </ConnectButton.Custom>
//     )
// }