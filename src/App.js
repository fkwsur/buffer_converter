import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [result, showResult] = useState(false); //파일

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };

  return (
    <div className="App">
      <h2>내가 편하려고 만든 파일 버퍼 변환기</h2>
      {!result ? (
        <>
          <input type="file" onChange={handleChangeFile} />
          <button type="button" onClick={() => showResult(true)}>
            테스트
          </button>
          <br />
          <br />
          <br />
          <hr />
        </>
      ) : (
        <div>
          <button type="button" onClick={() => showResult(false)}>
            다시하기
          </button>
          <h3>변환 결과 ↓</h3>
          <h4>file</h4>
          <p className="imgFile">
            type : {JSON.stringify(imgFile.type)}
            <br />
            name : {JSON.stringify(imgFile.name)}
            <br />
            size : {JSON.stringify(imgFile.size)}
            <br />
            lastModifiedDate : {JSON.stringify(imgFile.lastModifiedDate)}
            <br />
          </p>
          <br />
          <h4>buffer</h4>
          <p className="imgFile">{JSON.stringify(imgBase64)}</p>
          <br />
        </div>
      )}
    </div>
  );
}

export default App;
