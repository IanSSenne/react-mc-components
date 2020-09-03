import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ItemMenu, EnchantmentMenu, GiveMenu } from "./give";
import items from "./items.json";

const Test = ({ scale }) => {
  const [lastOutput, setLastOutput] = useState()
  return <>
    <GiveMenu
      scale={scale}
      onSubmit={setLastOutput}
      items={items}></GiveMenu>
    <textarea value={JSON.stringify(lastOutput)}></textarea>
  </>
}
function App() {
  return <React.Fragment>
    <Test scale={2}></Test>
  </React.Fragment>
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

