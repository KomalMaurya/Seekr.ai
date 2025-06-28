import React from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchCheck ,Atom, Cpu,Globe, Paperclip, Mic, AudioLines} from 'lucide-react'
import { Button } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from '@/services/Shared'

function ChatBoxInput() {
    
  return (
    <div className='flex flex-col h-screen items-center justify-center w-full'>
        <Image src={'/logo(1).png'} alt='logo' width={200} height={200} className='rounded-full'/>
        <div className='p-2 w-full max-w-2xl border rounded-2xl mt-10'>
            <div className='flex justify-between items-end'>
            <Tabs defaultValue="Search" className="w-[400px]">
                <TabsContent value="Search"><input placeholder='Ask Anything' type='text' className='w-full p-4 outline-none'/></TabsContent>
                <TabsContent value="Research"><input placeholder='Research Anything' type='text' className='w-full p-4 outline-none'/></TabsContent>
                <TabsList>
                    <TabsTrigger value="Search" className={'text-primary'}><SearchCheck/>Search</TabsTrigger>
                    <TabsTrigger value="Research" className={'text-primary'}><Atom/>Research</TabsTrigger>
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
                <Button><AudioLines className='text-white h-5 w-5'/></Button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ChatBoxInput