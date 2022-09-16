import Head from 'next/head';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import base64 from 'base-64';
import { useEffect, useState } from 'react';
import { ShinyCards } from '../shiny-cards/shiny-cards';

export const DexnavOdds = () => {

  const [searchLevel, setSearchLevel] = useState(0);
  const [hasShinyCharm, setHasShinyCharm] = useState(true);
  const [chain, setChain] = useState(0);
  const [respData, setRespData] = useState(null);

  const handleSearchLevel = (e) => {
    const nSearchLevel = e.target.value;
    nSearchLevel >= 0 && nSearchLevel <= 999 && setSearchLevel(nSearchLevel);
  }

  const handleSearchLevelBlur = () => {
    !searchLevel && setSearchLevel(0);
  }

  const handleShinyCharm = () => {
    setHasShinyCharm(true);
  }

  const handleNoShinyCharm = () => {
    setHasShinyCharm(false);
  }

  const handleChain = (e) => {
    const nChain = e.target.value;
    nChain >= 0 && nChain <= 100 && setChain(nChain);
  }

  const handleChainBlur = () => {
    !chain && setChain(0);
  }

  const handleSubmit = async () => {
    searchLevel < 999 ? setSearchLevel(parseInt(searchLevel) + 1) : setSearchLevel(999);
    chain < 100 ? setChain(parseInt(chain) + 1) : setChain(100);
  }

  const requestShinyOdds = async () => {
    const requestBody = {
      'searchLevel': searchLevel,
      'hasShinyCharm': hasShinyCharm,
      'chain': chain
    };
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(`${process.env.NEXT_PUBLIC_SERVICE_USERNAME}:${process.env.NEXT_PUBLIC_SERVICE_PASSWORD}`));
    headers.set('Content-Type', 'application/json');
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASEURL}/catan-generator-service/dexnav/shinyOdds`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });
    return await response.json().then(data => {
      setRespData(data);
    });
  }

  const handleReset = async () => {
    setSearchLevel(0);
    setHasShinyCharm(true);
    setChain(0);
    requestShinyOdds();
  }

  useEffect(() => {
    requestShinyOdds();
  }, [respData])

  return (
    <Grid container justifyContent="center">
      <Head>
        <title>Gen VI Shiny Calculator</title>
        <link rel="icon" href="pokeball.ico" />
      </Head>
      <Grid item xs={12} textAlign="center" p={3}>
        <Typography variant="h6">Gen VI Shiny Calculator</Typography>
      </Grid>
      <Grid item xs={12} textAlign="center" p={1}>
        <TextField label="Search Level" type="number" variant="standard" InputLabelProps={{ shrink: true }} value={searchLevel} onChange={handleSearchLevel} onBlur={handleSearchLevelBlur} />
      </Grid>
      <Grid item xs={12} textAlign="center" p={1}>
        <FormControl>
          <FormLabel>Shiny Charm?&nbsp;{
            <Tooltip disableFocusListener title="The Shiny Charm adds 2 additional rolls" placement="right" arrow>
              <InfoOutlinedIcon fontSize="small"/>
            </Tooltip>
          }</FormLabel>
          <FormGroup row>
            <FormControlLabel control={<Checkbox checked={hasShinyCharm} onChange={handleShinyCharm} />} label="Yes" labelPlacement="end" />
            <FormControlLabel control={<Checkbox checked={!hasShinyCharm} onChange={handleNoShinyCharm} />} label="No" labelPlacement="end" />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} textAlign="center" p={1}>
        <TextField label="Chain" type="number" variant="standard" InputLabelProps={{ shrink: true }} value={chain} onChange={handleChain} onBlur={handleChainBlur} />
      </Grid>
      <Grid item xs={12} textAlign="center" p={1}>
        <Button variant="outlined" onClick={handleSubmit}>Enter</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
      </Grid>
      <ShinyCards respData={respData} />
    </Grid>
  )
}

export default DexnavOdds;
