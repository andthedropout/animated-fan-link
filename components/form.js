import React from "react";
import { Router, useRouter } from "next/router";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ColorPicker from 'material-ui-color-picker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Form = () => {
  const [state, setState] = React.useState({
    background: "bubble",
    color1: "#aaa",
    color2: "#bbb",
    color3: "#ccc",
    fbpixel: "",
    spotify: "",
    apple: "",
    soundcloud: "",
    youtube: "",
    bandcamp: "",
    amazon: ""
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

  const handleChangeSelect = (e) => {
    console.log(e)
    setState({ ...state, background: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    var colorReady1 = state.color1.substring(1)
    var colorReady2 = state.color2.substring(1)
    var colorReady3 = state.color3.substring(1)
    router.push('/link?soundcloud=' + state.soundcloud + '&youtube=' + state.youtube + '&apple=' + state.apple + '&spotify=' + state.spotify + '&fb=' + state.fbpixel + '&background=' + state.background + '&color1=' + colorReady1 + '&color2=' + colorReady2 + '&color3=' + colorReady3)
  }

  return (
    <form className="max-w-xl m-auto bg-white shadow-md flex flex-col gap-y-4 rounded p-10 font-sans" onSubmit={handleSubmit}>
      <Typography className="text-slate-700 text-center mb-4 font-sans font-semibold" variant="h4" component="h4">
        EZ Music Promo Link Builder
      </Typography>
      <Typography className="text-slate-700 text-center font-sans mb-2" variant="h6" component="h6">
        Pick a Background:
      </Typography>
      <Select
        labelId="background-select"
        id="background-select"
        value={state.background}
        name="background"
        onChange={handleChangeSelect}
      >
        {/* Add this back in later =*/}
        {/* <MenuItem value="sunshine">Sunshine Animation</MenuItem> */}
        <MenuItem value="bubble">(Interactive) Bubble Animation</MenuItem>
        <MenuItem value="gradient">Gradient</MenuItem>
        <MenuItem value="solid">Solid Color</MenuItem>
      </Select>

      <Typography className="text-slate-700 text-center font-sans mt-4" variant="h6" component="h6">
        Pick a Color Scheme:
      </Typography>
      <div className="flex sm:flex-row flex-col gap-x-2 text-center m-auto w-full mb-8">

        <div className="w-full">
          <ColorPicker
            className="w-full"
            name='color1'
            type="text"
            placeholder={state.color1}
            value={state.color1}
            onChange={color => handleChangeColor1(color)}
          />
          <div className="drop-shadow-md" style={{ backgroundColor: state.color1, height: "1rem", marginTop: "1rem" }}></div>
        </div>
        {(state.background == "gradient" || state.background == "bubble") &&
          <div className="w-full">
            <ColorPicker
              className="w-full"
              name='color2'
              type="text"
              placeholder={state.color2}
              value={state.color2}
              onChange={color => handleChangeColor2(color)}
            />
            <div className="drop-shadow-md" style={{ backgroundColor: state.color2, height: "1rem", marginTop: "1rem" }}></div>
          </div>}
        {state.background == "bubble" &&
          <div className="w-full">
            <ColorPicker
              className="w-full"
              name='color3'
              type="text"
              placeholder={state.color3}
              value={state.color3}
              onChange={color => handleChangeColor3(color)}
            />
            <div className="drop-shadow-md" style={{ backgroundColor: state.color3, height: "1rem", marginTop: "1rem" }}></div>
          </div>}
      </div>
      <Typography className="text-slate-700 text-center font-sans mb-2" variant="h6" component="h6">
        Add The Links:
      </Typography>
      <TextField id="outlined-basic" label="Youtube (Video ID Only)" variant="outlined"
        name="youtube"
        type="text"
        placeholder="Youtube Video ID (Not URL)"
        onChange={handleChange}
        value={state.youtube}
        required
      />
      <TextField id="outlined-basic" label="Spotify URL" variant="outlined"
        name="spotify"
        type="url"
        placeholder="Spotify URL"
        onChange={handleChange}
        value={state.spotify}
      />
      <TextField id="outlined-basic" label="Apple Music URL" variant="outlined"
        name="apple"
        type="url"
        placeholder="Apple Music URL"
        onChange={handleChange}
        value={state.apple}
      />
      <TextField id="outlined-basic" label="Soundcloud URL" variant="outlined"
        name="soundcloud"
        type="url"
        placeholder="Soundcloud URL"
        onChange={handleChange}
        value={state.soundcloud}
      />
      <TextField id="outlined-basic" label="Bandcamp URL" variant="outlined"
        name="bandcamp"
        type="url"
        placeholder="Bandcamp URL"
        onChange={handleChange}
        value={state.bandcamp}
      />
      <TextField id="outlined-basic" label="Amazon Music URL" variant="outlined"
        name="amazon"
        type="url"
        placeholder="Amazon Music URL"
        onChange={handleChange}
        value={state.amazon}
      />
      <Typography className="text-slate-700 text-center font-sans mb-2 mt-4" variant="h6" component="h6">
        Add Facebook Pixel ID:
      </Typography>
      <TextField id="outlined-basic" label="Facebook Pixel ID" variant="outlined"
        name="fbpixel"
        type="text"
        className="mb-8"
        placeholder="Facebook Pixel ID"
        onChange={handleChange}
        value={state.fbpixel}
      />
      <Button className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded" type="submit">Make It</Button>
    </form>
  )
}

const LinkBuilder = () => {
  return (
    <>
      <Form />
    </>
  );
};

export default LinkBuilder;