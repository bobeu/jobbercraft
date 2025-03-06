import React, { ChangeEvent } from 'react';
// import { Button, Input, Modal } from 'antd';
// import { UploadOutlined } from 'ant-design@/icons';
// import type { UploadProps } from 'antd';
// import { message, Upload } from 'antd';
import { useAccount, useConfig } from 'wagmi';
import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
import Input from '@mui/material/Input';
import { CustomButton } from '@/components/CustomButton';
import becomeAJobber from '@/apis/update/jobberCraft/becomeAJobber';
import { formatAddr } from '@/utilities';
import { TransactionCallback } from '@/customTypes';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import useAppStorage from '@/components/StateContextProvider/useAppStorage';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ButtonTemplate from '@/components/ButtonTemplate';
// import sendTransactions from '@/components/apis';

interface CreateAvatarProps {
  toggleModal: () => void;
  modalOpen: boolean;
}

const CreateAvatar = (props: CreateAvatarProps) => {
  const { toggleModal, modalOpen } = props;
  const [name, setName] = React.useState<string>('');
  const [aka, setAlias] = React.useState<string>('');
  const [field, setField] = React.useState<string>('');
  const [profileURI, setProfileUrl] = React.useState<string>('');

  const { address, isConnected } = useAccount();
  const config = useConfig();
  const { setmessage } = useAppStorage()

  const callback: TransactionCallback = (arg) => {
    setmessage(arg.message)
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, value: string) => {
    event?.preventDefault();
    const setValue = event.target.value;
    switch (value) {
      case 'name':
        setName(setValue);
        break;

      case 'aka':
        setAlias(setValue);
        break;

      case 'field':
        setField(setValue);
        break;

      case 'profileurl':
        setProfileUrl(setValue);
        break;
    
      default:
        break;
    }
  };

  const handleSubmitForm = async() => {
    if(name === '') return alert('Name not filled');
    if(aka === '') return alert('AKA not filled');
    if(field === '') return alert('Field not filled');
    if(profileURI === '') return alert('ProfileURI not filled');
    console.log("FormRef", 
      `${name}\n${aka}\n${field}\n${profileURI}`
    );
    await becomeAJobber({
      config,
      account: formatAddr(address),
      aka,
      avatarUrl: profileURI,
      field,
      name,
      profileURI,
      callback
    }).then(() => {
      toggleModal();
    }).catch((error) => {
      toggleModal();
      console.log("Error: ", error);
    })
  }

  return (
    <>
      <Modal
        open={modalOpen}
        title="Sign Up"
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        onClose={toggleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
            backdrop: {
                timeout: 500,
            },
        }}
        hidden={!modalOpen}
      >
        <Fade in={modalOpen}>
          <Box className='bg-gray1 w-full p-2'>
            <div className='p-2 text-cyan-300 flex justify-between items-center'>
              <h1 className='text-lg font-semibold' >Sign Up</h1>
              <button className='px-2 py-1 border border-cyan-300 cursor-pointer' onClick={toggleModal}>Back</button>
            </div>
            <ul className='flex flex-col justify-center items-center text-white1 space-y-4'>
              <li>
                <h1 className=''>Name</h1>
                <Input placeholder='Cannot be changed' onChange={(e) => handleOnChange(e, 'name')} type='text' required className='p-2 bg-white1 md:w-[350px]'/>
              </li>
              <li>
                <h1>Alias</h1>
                <Input placeholder='aka/alias' onChange={(e) => handleOnChange(e, 'aka')} required type='text' className='p-2 bg-white1 md:w-[350px]'/>
              </li>
              <li>
                <h1>Field</h1>
                <Input placeholder='ex: UI/UX Designer' onChange={(e) => handleOnChange(e, 'field')} type='text' required className='p-2 bg-white1 md:w-[350px]' />
              </li>
              <li>
                <h1>{'Portfolio/Website/Profile URI'}</h1>
                <Input placeholder='Portfolio/Bios/Website' onChange={(e) => handleOnChange(e, 'profileurl')} type='text' className='p-2 bg-white1 md:w-[350px]' />
              </li>
              <li className='w-full'>
                <button className='p-2 w-full bg-green1' onClick={handleSubmitForm}>Submit</button>
              </li>
            </ul>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CreateAvatar;


