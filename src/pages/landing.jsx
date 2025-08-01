import React from 'react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'

const Landingpage = () => {
  const [longUrl, setLongUrl] = useState();
 
  const navigate = useNavigate()
  const  handleShorten =(e) =>  {
    e.preventDefault();
    if(longUrl) navigate(`/auth?createNew=${longUrl}`);
  }
  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>
        The only URL Shortener <br /> you&rsquo;ll ever need! 🔗
      </h2>
      <form onSubmit={handleShorten}className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
        <input  
        value={longUrl}
        type="url"  
        placeholder='Enter your loooong URL' 
        onChange={(e)=> setLongUrl(e.target.value)}
        className='h-full flex-1 py-4 px-4'/>
        <Button className="h-full" type='submit' variant='destructive'>Shorten!</Button>
      </form>
      <img src="/banner.png" alt="banner"  className='w-full my-11 md:px-11'/>
    <Accordion type="multiple" collapsible className='w-full md:px-11' >
  <AccordionItem value="item-1">
    <AccordionTrigger>
      How does the Strim works?
    </AccordionTrigger>
    <AccordionContent>
     When you enter a long URL, our system genetrates a shorter version of that URL. This shortened URL redirects to the original long URL when accessed.
    </AccordionContent>
  </AccordionItem>
   <AccordionItem value="item-2">
    <AccordionTrigger>
      Do I need an account to use the app?
    </AccordionTrigger>
    <AccordionContent>
    Yes, Creating an account allows you to manage your URLs, view analytics, and customize your short URLs.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>
     What analytics are available for my shortened URLs?
    </AccordionTrigger>
    <AccordionContent>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, dignissimos consectetur culpa nostrum laudantium modi.
    </AccordionContent>
  </AccordionItem>
</Accordion>
    </div>
  )
}

export default  Landingpage
