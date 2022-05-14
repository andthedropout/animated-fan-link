import React from "react";
import styles from '../styles/Home.module.css'
import { Router, useRouter } from "next/router";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ColorPicker from 'material-ui-color-picker';

const Form = () => {
  const [state, setState] = React.useState({
    color1: "",
    color2: "",
    color3: "",
    color4: "",
    fbpixel: "",
    spotify: "",
    apple: "",
    soundcloud: "",
    youtube: ""
  });

  const router = useRouter()

  function handleChange(e) {
      setState({ ...state, [e.target.name]: e.target.value });
  }
  function handleChangeColor1(e) {
    setState({ ...state, color1: e });
}
function handleChangeColor2(e) {
    setState({ ...state, color2: e });
}
function handleChangeColor3(e) {
    setState({ ...state, color3: e });
}

  async function handleSubmit(e) {
    e.preventDefault();
    var colorReady1 = state.color1.substring(1)
    var colorReady2 = state.color2.substring(1)
    var colorReady3 = state.color3.substring(1)
    router.push('/link?soundcloud=' + state.soundcloud + '&youtube=' + state.youtube + '&apple=' + state.apple + '&spotify=' + state.spotify + '&fb=' + state.fbpixel + '&color1=' + colorReady1 + '&color2=' + colorReady2 + '&color3=' + colorReady3)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
    <div style={{display: "flex", flexDirection: "row"}}>
    <div style={{marginRight: "1rem"}}>
    <label>Color 1</label>
    <ColorPicker
    name='color1'
    type="text"
    placeholder={state.color1}
    value={state.color1}
    onChange={color => handleChangeColor1(color)}
    />
    <div style={{backgroundColor: state.color1, height: "1rem", marginTop: "1rem"}}></div>
    </div>
    <div style={{marginLeft: "1rem", marginRight: "1rem"}}>
    <label>Color 2</label>
    <ColorPicker
    name='color2'
    type="text"
    placeholder={state.color2}
    value={state.color2}
    onChange={color => handleChangeColor2(color)}
    />
    <div style={{backgroundColor: state.color2, height: "1rem", marginTop: "1rem"}}></div>
    </div>
    <div style={{marginLeft: "1rem"}}>
    <label>Color 3</label>
    <ColorPicker
    name='color3'
    type="text"
    placeholder={state.color3}
    value={state.color3}
    onChange={color => handleChangeColor3(color)}
    />
    <div style={{backgroundColor: state.color3, height: "1rem", marginTop: "1rem"}}></div>
    </div>
    </div>
        <TextField id="outlined-basic" label="FB Pixel ID" variant="outlined" 
        name="fbpixel"
        type="text"
        placeholder="Facebook Pixel ID"
        onChange={handleChange}
        value={state.fbpixel}
        required
      />
          <TextField id="outlined-basic" label="Spotify URL" variant="outlined" 
        name="spotify"
        type="text"
        placeholder="Spotify URL"
        onChange={handleChange}
        value={state.spotify}
        required
      />
              <TextField id="outlined-basic" label="Apple Music URL" variant="outlined" 
        name="apple"
        type="text"
        placeholder="Apple Music URL"
        onChange={handleChange}
        value={state.apple}
        required
      />
        <TextField id="outlined-basic" label="Soundcloud (Song ID)" variant="outlined" 
        name="soundcloud"
        type="text"
        placeholder="Soundcloud Song ID (Not URL)"
        onChange={handleChange}
        value={state.soundcloud}
        required
      />
        <TextField id="outlined-basic" label="Youtube (Video ID)" variant="outlined" 
        name="youtube"
        type="text"
        placeholder="Youtube Video ID (Not URL)"
        onChange={handleChange}
        value={state.youtube}
        required
      />
          <Button variant="contained" type="submit">Make It</Button>
    </form>
  )
}

const Contact = () => {
  return (
    <div style={{border: "1px solid #888", padding: "2rem", borderRadius: "6px", backgroundColor: "white"}}>
        <Typography variant="h5" component="h5" style={{marginBottom:"2rem",textAlign: "center", fontWeight:"bold"}}>
            Uper Sluper Duper Simple Music Link Tree Builder
        </Typography>
      <Form/>
    </div>
  );
};

export default Contact;