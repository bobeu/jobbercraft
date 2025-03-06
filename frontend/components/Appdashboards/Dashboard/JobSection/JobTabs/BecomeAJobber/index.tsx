import React, { ChangeEvent } from 'react';
// import { Input, Modal } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import type { UploadProps } from 'antd';
// import { message, Upload } from 'antd';
import { useAccount, useConfig } from 'wagmi';
// import sendTransactions from '@/components/apis';
import { useNavigate } from 'react-router-dom';
import { Container, Input } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';
// import becomeAJobber from '@/apis/update/jobberCraft/becomeAJobber';
import { formatAddr, handleTransact } from '@/utilities';
import { TransactionCallback } from '@/customTypes';

const BecomeAJobber = () => {
  const [name, setName] = React.useState<string>('');
  const [aka, setAlias] = React.useState<string>('');
  const [field, setField] = React.useState<string>('');
  const [profileURI, setProfileUrl] = React.useState<string>('');

  const { address, isConnected } = useAccount();
  const config = useConfig();
  const navigate = useNavigate();

  const backToMain = () => {
    navigate('appmain', {preventScrollReset: true,});
  }

  const callback: TransactionCallback = (arg) => {
    console.log("Arg: ", arg.message);
  }

  const handleCreateAvatar = async() => {
    if(!isConnected) return alert("Please connect wallet");
    await handleTransact({
      account: formatAddr(address),
      functionName: 'becomeAJobber',
      become_JOBBER: {
        aka,
        name,
        field,
        avatarUrl: 'disabled',
        profileURI,
        config,
        account: formatAddr(address),
        callback
      },
    })
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

  const onSubmit = async() => {
    console.log("FormRef", 
      `${name}\n${aka}\n${field}\n${profileURI}`
    );

    await handleCreateAvatar();
  }

  // const uploadProps: UploadProps = {
  //   name: 'file',
  //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <React.Fragment>
      <Container maxWidth={'sm'} >
        <div className='bg-cyan-700 w-full p-2 rounded mt-2 md:mt-20'>
          <div className='p-2'>
            <h1 className='text-white text-lg font-semibold'>Sign Up</h1>
          </div>
          <div className='flex flex-col justify-start pl-4 pb-4 items-center gap-3'>
            <Input placeholder='Cannot be changed' onChange={(e) => handleOnChange(e, 'name')} type='text' required className='p-3'/>
            <Input placeholder='Alias' onChange={(e) => handleOnChange(e, 'aka')} required type='text' className='p-3'/>
            <Input placeholder='ex: UI/UX Designer' onChange={(e) => handleOnChange(e, 'field')} type='text' required className='p-3' />
            <Input placeholder='Portfolio/Bios/Website' onChange={(e) => handleOnChange(e, 'profileurl')} type='text' className='p-3' />
            <div className='w-full flex justify-start pl-3'>
              {/* <Upload {...uploadProps} disabled className='bg-white text-cyan-700 rounded-lg '> */}
                {/* <Button startIcon={<UploadOutlined />} className='w-full p-4'>Click to Upload</Button> */}
                <Button startIcon={""} className='w-full p-4'>Click to Upload</Button>
              {/* </Upload> */}
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end items-center gap-2 mt-6'>
          <button className='w-[40%] bg-cyan-500 rounded  border-cyan-500 text-white hover:shadow-sm hover:shadow-yellow-500 py-4 hover:text-white' >
            <Link href={'/appmain'}>
              Return
            </Link>
          </button>,
          <button className='bg-cyan-700 w-[40%] rounded text-white hover:shadow-sm hover:shadow-yellow-500 py-4 hover:text-white' onClick={onSubmit}>
            Create my Avatar
          </button>,
        </div>
      </Container>
    </React.Fragment>
  );
};

export default BecomeAJobber;


