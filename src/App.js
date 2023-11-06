import React, { useState, useCallback, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [length, setLength] = useState(8);
  const [numChecked, setNumChecked] = useState(true);
  const [charChecked, setCharChecked] = useState(true);
  const [password, setPassword] = useState("");
  const [btnText, setBtnText] = useState("Copy");
  let passRef = useRef();

  let copyPassword = useCallback(() => {
    // console.log('Copied to Clipboard')
    passRef.current && passRef.current.select();
    passRef.current && passRef.current.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
    setBtnText("Copied");
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM";
    numChecked && (str += "1234567890");
    charChecked && (str += "!@#$%&?");

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, numChecked, charChecked, password]);

  useEffect(() => {
    passwordGenerator();
    setBtnText("Copy");
  }, [length, numChecked, charChecked]);

  return (
    <div className="vstack row bg-dark shadow text-white py-4 px-5 rounded-3">
      <h2 className="display-5 fw-bold text-center mb-4">Password Generator</h2>
      <div className="col-12 mx-auto gap-2 hstack">
        <input
          type="text"
          className="form-control"
          ref={passRef}
          value={password}
          readOnly
        />
        <button
          className="btn btn-primary"
          onClick={copyPassword}
          disabled={btnText === "Copied"}
        >
          {btnText}
        </button>
      </div>
      <div className="lower-div d-flex justify-content-between align-items-center mt-4 col-12  mx-auto">
        <div>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <p>Length ({length})</p>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={numChecked}
            onClick={() => {
              setNumChecked(!numChecked);
            }}
            className="me-1"
            id="number"
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={charChecked}
            onClick={() => {
              setCharChecked(!charChecked);
            }}
            className="me-1"
            id="Character"
          />
          <label htmlFor="number">Character</label>
        </div>
      </div>
    </div>
  );
}
