// function defaultErrors(error: string) {
//     return [
//         {
//             key: '1',
//             value: () => ``
//         },
//         {
//             key: '2',
//             value: () => ''
//         },
//         {
//             key: '3',
//             value: () => ``
//         },
//         {
//             key: '4',
//             value: () => ``
//         },
//         {
//             key: '5',
//             value: () => ``
//         },
//         {
//             key: '6',
//             value: () => ``
//         },
//         {
//             key: '7',
//             value: () => ``
//         },
//         {
//             key: '8',
//             value: () => ''
//         },
//         {
//             key: '9',
//             value: () => ``
//         },
//         {
//             key: '10',
//             value: () => ``
//         },
//         {
//             key: '11',
//             value: () => ``
//         },
//         {
//             key: '12',
//             value: () => ``
//         },
//         {
//             key: '13',
//             value: () => 'User not permitted'
//         },
//         {
//             key: '14',
//             value: () => 'Getting finance not activated'
//         },
//         {
//             key: '15',
//             value: () => 'This pool is yet to achieve the required participants yet'
//         },
//         {
//             key: '16',
//             value: () => 'Cannot override expected user because the grace period has not lapse'
//         },
//         {
//             key: '17',
//             value: () => `Collateral too low. Please set a higher value`
//         },
//         {
//             key: '18',
//             value: () => `Payback stage not ready`
//         },
//         {
//             key: '19',
//             value: () => 'User has no debt to service'
//         },
//         {
//             key: '20',
//             value: () => 'No defaulter yet'
//         },
//         {
//             key: '21',
//             value: () => 'Cannot cancel pool at this time'
//         },
//         {
//             key: '22',
//             value: () => 'Cannot cancel pool at this time'
//         },
//         {
//             key: '23',
//             value: () => 'Only admin/operator is permitted'
//         },
//         {
//             key: '24',
//             value: () => 'Withdrawal failed'
//         },
//         {
//             key: '25',
//             value: () => 'XFI not enough'
//         },
//         {
//             key: '26',
//             value: () => 'Invalid duration given'
//         },
//         {
//             key: '27',
//             value: () => 'No Permission detected'
//         },
//         {
//             key: '28',
//             value: () => 'Please check your internet connection'
//         },
//         {
//             key: '29',
//             value: () => 'Cannot reach destination. Please check your internet connection'
//         },
//         {
//             key: '30',
//             value: () => 'Cannot complete request. Please check your internet connection'
//         },
//     ]
// }

// export const formatError = (error: any) : string => {
//     const errorMessage : any = error?.message || error?.data?.message || error;
//     const filteredMessage = defaultErrors(errorMessage).filter(({key,}) => errorMessage?.match(key));
//     if(filteredMessage.length && filteredMessage.length > 0) return filteredMessage[0].value();
//     return errorMessage?.length > 100? errorMessage.substring(0, 100) : errorMessage;
// }

// export const errorMessage = (error: any) => {
//     return (`This transaction will likely fail! Reason: ${formatError({error})}`)
// }

// interface DefaultErrorArgs {
//     durationInSec?: number;
//     amount?: string;
//     epochId?: string;
//     duration?: string;
//     maxEpochDuration?: string;
// }

// export interface FormatErrorArgs extends DefaultErrorArgs {
//     error: any;
// }