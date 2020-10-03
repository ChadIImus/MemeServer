import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Input, Schema } from 'rsuite';
import { useMemeState } from './State';

const UploadPage :React.FC = (props) =>{
  const {toptext,setTopText,bottomtext,setBottomText,visualFile,setVisualFile,soundFile,setSoundFile} = useMemeState();

  
  useEffect(() => {
    if (!visualFile) {
      const thing = document.getElementById('submit') as HTMLButtonElement;
      thing.disabled = true;
    }
  })

  function handleUpload(){
    if (visualFile){
      let formdata = new FormData();
      formdata.append("toptext",toptext);
      formdata.append("bottomtext",bottomtext);
      formdata.append("visualFile",visualFile);
      if(soundFile){
        formdata.append("soundFile",soundFile);
      }
      console.log(formdata);
    } 
  }


  function fileChangeHandler(v:string,event:React.SyntheticEvent<HTMLElement>){
    const target = ((event.currentTarget as HTMLInputElement))
    if (target.files){
      if(target.name === 'visualFile')
      {
        setVisualFile(target.files[0])
      } 
      else if (target.name === 'soundFile') {
        setSoundFile(target.files[0])
      }
    }
  }



  return (
    <Form className="Login-form">
        <FormGroup>
          <ControlLabel>Toptext</ControlLabel>
          <FormControl name="toptext" onChange={(v,e) => setTopText(v)}/>
          <HelpBlock tooltip>The toptext of your dank meme</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Bottomtext</ControlLabel>
          <FormControl name="bottomtext"  onChange={(v,e) => setBottomText(v)}/>
          <HelpBlock tooltip>Pretty self explanatory tbh</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Meme</ControlLabel>
          <Input type="file" name = "visualFile" accept=".png,.jpg,.jpeg,.mp4,.gif" onChange={fileChangeHandler}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Optional soundfile</ControlLabel>
          <Input type="file" name = "soundFile" accept=".mp3,.wav" onchange={fileChangeHandler}/>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button block id="submit" appearance="primary" onClick={handleUpload}>Upload</Button>  
          </ButtonToolbar>
        </FormGroup>
    </Form>
    );
}


export default UploadPage;