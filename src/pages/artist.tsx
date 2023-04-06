import styles from '@/styles/Home.module.css'
import { Navbar, Footer, CreateCollection, CustomNftCard, ArtistCard } from '@/components/nfts'

import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Avatar,
  Wrap,
  WrapItem,
  Center,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
 
} from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import { getAccount } from '@wagmi/core'
import { readContract } from '@wagmi/core'
import { ARTIST_ABI, ARTIST_CONTRACT_ADDRESS } from '@/contracts/constants'
import { useEffect, useState } from 'react'
import { getJSONFromCID } from '@/utils'
import { useRouter } from 'next/router'
 
type Artist = {
  artistName: string;
  bio: string;
  imgHash: string;
 
}
interface ContractData {
  artistDetails: string;
} 




const IMAGE = 'https://cdn.punchng.com/wp-content/uploads/2022/12/18034549/Davido-1.jpg'


export default  function Artist() {
  const [artistDetails, setArtistDetails]= useState<Artist>({
    artistName: '',
    bio: '',
    imgHash: ''
  });

  const router = useRouter();
  const { id } = router.query;


  const getArtist = async ()=>{
    try {
      const account =  getAccount()
      if(account) {
        const data: ContractData = await readContract({
          address: ARTIST_CONTRACT_ADDRESS,
          abi: ARTIST_ABI,
          functionName: 'addressToArtist',
          args: [account.address]
        }) as ContractData;
    
        const artistDetails = await getJSONFromCID(data.artistDetails)
        setArtistDetails(artistDetails)
      }else {
        console.log(`eer`)
      }  
    }
     catch (error) {
  
      console.log(error)  
    }
  
  
  }
  
  useEffect(()=> {    
     getArtist(); 
  }, [])

  // getArtist();
  return (
    <>
     
          <main className={styles.main}>
            <Navbar />
            <Heading
              fontWeight={700}
              fontSize={'45px'}
              textAlign={'center'}
              fontFamily={'outfif'}
              lineHeight={'91px'}
            >
               Profile
            </Heading>

          <Center>
                    

            <Card align='center'>
            <CardHeader>
            <Wrap>
                
                   
                <WrapItem py={5} px={9}>
               
                    <Avatar size='2xl' name={artistDetails.artistName || `User`} src={`https://ipfs.io/ipfs/${artistDetails.imgHash}`} />{' '}
                </WrapItem>
                  
                </Wrap>
                <Heading size='md' textAlign={'center'}> {artistDetails.artistName||`Svatician`}</Heading>
            </CardHeader>
            <CardBody pt={-1}>
                <Text>{artistDetails.bio}</Text>
            </CardBody>
            <CardFooter>
                <h6>Artist</h6>
            </CardFooter>
        </Card>

        
         </Center>

         <Heading
              fontWeight={700}
              fontSize={'45px'}
              textAlign={'center'}
              fontFamily={'outfif'}
              lineHeight={'91px'}
            >
               Collections
            </Heading>

         <ArtistCard id={undefined} name={undefined} imgHash={undefined} />

           
            <Footer />
          </main>
       
    </>
  )
}
