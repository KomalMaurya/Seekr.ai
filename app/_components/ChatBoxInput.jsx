"use client"
import React from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchCheck ,Atom, Cpu,Globe, Paperclip, Mic, AudioLines, ArrowRight} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import {supabase} from '@/services/supabase'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from '@/services/Shared'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation' 

function ChatBoxInput() {

    const [userSearchInput, setUserSearchInput]=useState();
    const {user}=useUser();
    const [searchType,setSearchType]=useState('search');
    const [loading,setLoading]= useState(false);
    const router=useRouter();
    const onSearchQuery=async()=>{
        setLoading(true);
        const libId=uuidv4();
        const {data}=await supabase.from('Library').insert([
            {
                searchInput:userSearchInput,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                type:searchType,
                libId:libId
            }
        ]).select();
        setLoading(false);


        router.push('/search/'+libId);
        console.log(data[0])
    }

  return (
    <div className='flex flex-col h-screen items-center justify-center w-full'>
        <Image src={'/logo(1).png'} alt='logo' width={200} height={200} className='rounded-full'/>
        <div className='p-2 w-full max-w-2xl border rounded-2xl mt-10'>
            <div className='flex justify-between items-end'>
            <Tabs defaultValue="Search" className="w-[400px]">
                <TabsContent value="Search"><input placeholder='Ask Anything'
                onChange={(e)=>setUserSearchInput(e.target.value)} 
                type='text' className='w-full p-4 outline-none'/></TabsContent>
                <TabsContent value="Research"><input placeholder='Research Anything' 
                onChange={(e)=>setUserSearchInput(e.target.value)} 
                type='text' className='w-full p-4 outline-none'/></TabsContent>
                <TabsList>
                    <TabsTrigger value="Search" className={'text-primary'} onClick={()=>setSearchType('search')}><SearchCheck/>Search</TabsTrigger>
                    <TabsTrigger value="Research" className={'text-primary'} onClick={()=>setSearchType('research')}><Atom/>Research</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className='flex gap-4 items-center'>
                <DropdownMenu>
                    <Button asChild variant="ghost">
                        <DropdownMenuTrigger>
                            <Cpu className="text-gray-500 h-5 w-5" />
                        </DropdownMenuTrigger>
                    </Button>
                    <DropdownMenuContent>
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator /> */}
                    {AIModelsOption.map((model,index)=>(
                        <DropdownMenuItem key={index}>
                            <div className='mb-1'>
                                <h2 className='text-sm'>{model.name}</h2>
                                <p className='text-xs text-gray-500'>{model.desc}</p>
                            </div>
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant='ghost'>
                    <Globe className='text-gray-500 h-5 w-5'/>
                </Button>
                <Button variant='ghost'>
                    <Paperclip className='text-gray-500 h-5 w-5'/>
                </Button>
                <Button variant={'ghost'}>
                    <Mic className='text-gray-500 h-5 w-5'/>
                </Button>
                <Button onClick={()=>{
                    userSearchInput?onSearchQuery():null
                }}>
                    {!userSearchInput?<AudioLines className='text-white h-5 w-5'/>
                    :<ArrowRight className='text-white h-5 w-5' disabled={loading}/>}
                </Button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ChatBoxInput