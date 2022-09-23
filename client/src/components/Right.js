import "../App.css";
import { useState } from "react";

function Right() {
  const [nicknames, setNicknames] = useState([]);
  const [contents, setContents] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputCont, setInputCont] = useState('');

  const handleInputName = e => {
    setInputName(e.target.value);
  }

  const handleInputCont = e => {
    setInputCont(e.target.value);
  }

  const handleUpload = () => {
    setNicknames((prev) => {
      return [inputName, ...prev];
    });
    setContents((prev) => {
      return [inputCont, ...prev];
    });
    setInputName('');
    setInputCont('');
  }

  function submitFormToNotion2() {
    fetch("http://localhost:4000/submitFormToNotion_2", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nickname: inputName,
        Content: inputCont,
      }),
    })
    .then((data) => {
      console.log("success2!", data);
      handleUpload();
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
  }

  return (
    <>
      <div>무언가 죽어있다고 느낀 순간은 언제인가요?</div>
      <div>
        {nicknames.map((nickname, index) => {
          return <div key={index}>닉네임 : {nickname}, 내용 : {contents[index]}</div>
        })}
      </div>
      <div>
        <input type="rightanswer" name="content_right" value={inputCont}
         className="inputright" placeholder="당신의 답변을 적어주세요." onChange={handleInputCont} />
        <input type="rightnickname" name="nickname_right" className="inputright"
          value={inputName} placeholder="닉네임" onChange={handleInputName} required />
        <button onClick={submitFormToNotion2}>보내기</button>
      </div>     
    </>     
  );
}

export default Right;
