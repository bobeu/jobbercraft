// import * as React from 'react';
// import { styled, Box } from '@mui/system';
// import { Modal as BaseModal } from '@mui/base/Modal';
// import Button from '@mui/material/Button';

// type DisplayCalendarModalProps = {
//   open: boolean;
//   handleClose: () => void;
//   children: React.ReactNode;
// }


// export default function DisplayCalendarModal(props: DisplayCalendarModalProps) {
//   const { open, handleClose, children } = props;

//   const onClose = (event: object, reason: string) => {
//     // if(reason === "escapeKeyDown" || reason === "backdropClick") return handleClose();
//     handleClose();
//   }

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={onClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//         // slots={{ backdrop: StyledBackdrop }}
//       >
//         <ModalContent sx={style}>
//           <div>
//             <div className='flex justify-end items-center'>
//               <Button variant='text' size='small' onClick={handleClose}>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-cyan-700">
//                   <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </Button>
//             </div>
//             { children }
//           </div>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// const grey = {
//   50: '#F3F6F9',
//   100: '#E5EAF2',
//   200: '#DAE2ED',
//   300: '#C7D0DD',
//   400: '#B0B8C4',
//   500: '#9DA8B7',
//   600: '#6B7A90',
//   700: '#434D5B',
//   800: '#303740',
//   900: '#1C2025',
// };

// const Modal = styled(BaseModal)`
//   position: fixed;
//   z-index: 1300;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
// };

// const ModalContent = styled(Box)(
//   ({ theme }) => `
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
//   overflow: hidden;
//   background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
//   border-radius: 8px;
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//   box-shadow: 0px 4px 12px ${
//     theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
//   };
//   padding: 1rem;
//   color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
//   font-family: IBM Plex Sans, sans-serif;
//   font-weight: 500;
//   text-align: start;
//   position: relative;

//   & .modal-title {
//     margin: 0;
//     line-height: 1.5rem;
//     margin-right: 0.5rem;
//   }

//   & .modal-description {
//     margin: 0;
//     line-height: 1.5rem;
//     font-weight: 400;
//     color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
//   }
//   `,
// );




import React, { useState } from 'react';
// import type { DatePickerProps, TimePickerProps } from 'antd';
// import { DatePicker, Select, Space, TimePicker } from 'antd';

// const { Option } = Select;

type PickerType = 'time' | 'date';

const PickerWithType = ({
  type,
  // onChange,
}: {
  type: PickerType;
  // onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
}) => {
  // if (type === 'time') return <TimePicker onChange={onChange} />;
  // if (type === 'date') return <DatePicker onChange={onChange} />;
  // return <DatePicker picker={type} onChange={onChange} />;
};

const DisplayCalendarModal = ({ setSelected } : {setSelected: (x: number | undefined) => void}) => {
  const [type, setType] = useState<PickerType>('time');

  return (
    <div>Calendar</div>
    // <Space>
    //   <Select value={type} onChange={setType}>
    //     {/* <Option value="time">Time</Option> */}
    //     <Option value="date">Date</Option>
    //     {/* <Option value="week">Week</Option>
    //     <Option value="month">Month</Option>
    //     <Option value="quarter">Quarter</Option>
    //     <Option value="year">Year</Option> */}
    //   </Select>
    //   <PickerWithType type={type} onChange={(value) => setSelected(value?.unix())} />
    // </Space>
  );
};

export default DisplayCalendarModal;