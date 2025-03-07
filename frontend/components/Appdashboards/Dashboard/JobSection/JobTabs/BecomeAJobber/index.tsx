import React from 'react';
import { useAccount, useConfig } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { Container, Input, Stack } from '@mui/material';
import { formatAddr, handleTransact } from '@/utilities';
import { TransactionCallback } from '@/customTypes';
import { ConnectWallet } from '@/components/ConnectWallet';

const BecomeAJobber = () => {
  const [name, setName] = React.useState<string>('');
  const [aka, setAlias] = React.useState<string>('');
  const [field, setField] = React.useState<string>('');
  const [profileUri, setProfileUrl] = React.useState<string>('');
  const [avatarUri, setAvatarUrl] = React.useState<string>('');

  const { address, isConnected } = useAccount();
  const config = useConfig();
  const navigate = useNavigate();

  const backToMain = () => {
    navigate('/', {preventScrollReset: true});
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
        avatarUrl: avatarUri,
        profileURI: profileUri,
        config,
        account: formatAddr(address),
        callback
      },
    })
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, tag: string) => {
    event?.preventDefault();
    const setValue = event.target.value;
    switch (tag) {
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

      case 'avatarurl':
        setAvatarUrl(setValue);
        break;
    
      default:
        break;
    }
  };

  const onSubmit = async() => {
    console.log("FormRef", 
      `${name}\n${aka}\n${field}\n${profileUri}`
    );

    await handleCreateAvatar();
  }

  return (
    <div className='bg-green1'>
      <Container maxWidth={'sm'} className='space-y-8'>
        <div className='w-full rounded pt-4 md:pt-10'>
          <div className='text-white pb-4 font-semibold flex justify-between items-center'>
            <h1 className='text-lg text-cyan-600'>Sign Up</h1>
            <button className='border border-gray1 rounded-lg px-2 py-1 text-cyan-300 hover:text-cyan-600' onClick={backToMain}>Back</button>
          </div>
          <Stack className='space-y-4 rounded-lg'>
            <Input placeholder='Cannot be changed' onChange={(e) => handleOnChange(e, 'name')} type='text' required className='p-1 bg-cyan-100'/>
            <Input placeholder='Alias' onChange={(e) => handleOnChange(e, 'aka')} required type='text' className='p-1 bg-cyan-100'/>
            <Input placeholder='ex: UI/UX Designer' onChange={(e) => handleOnChange(e, 'field')} type='text' required className='p-1 bg-cyan-100' />
            <Input placeholder='Portfolio/Bios/Website' onChange={(e) => handleOnChange(e, 'profileurl')} type='text' className='p-1 bg-cyan-100' />
            <Input placeholder='Avatar uri (if any)' onChange={(e) => handleOnChange(e, 'avtarurl')} type='text' className='p-1 bg-cyan-100' />
          </Stack>
        </div>
        <div className='flex justify-start'>
        {
          !isConnected? <ConnectWallet /> : 
            <button className='border border-gray1 w-[40%] rounded-lg text-white hover:text-cyan-600 py-4' onClick={onSubmit}>
              Submit
            </button>
        }
        </div>
      </Container>
    </div>
  );
};

export default BecomeAJobber;


