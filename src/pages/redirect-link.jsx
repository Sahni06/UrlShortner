import { getLongUrl } from '@/db/apiUrls'
import { storeClicks } from '@/db/apiClicks'
import useFetch from '@/hooks/use-fetch'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Redirectlink = () => {
  const {id} = useParams()

  const {loading, data, fn} = useFetch(getLongUrl, id)

  const{loading: loadingStats, fn: fnStats} = useFetch(storeClicks,{
    id: data?.id,
    created_url: data?.created_url,

  })
   
  useEffect(()=>{
fn()
  },[])

  useEffect(()=>{
    if(!loading && data){
      fnStats()
    }
  },[loading])

  if(loading || loadingStats){
    return (
      <>
      <BarLoader width ={"100%"} color= "#36d7b7" />
     <br />
      Redirecting...   
      </>
    )
  }
  return null
  
}

export default Redirectlink
