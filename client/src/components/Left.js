import "../App.css";
import { useState } from "react";

function Left() {
  const getDataFromBackend = async () => {
    const rest = await fetch("http://localhost:4000/list");
  
    const data = await rest.json();
    
  
    // const nicknameList = [];
    // const contentList = [];
    // const list = [];
    // data.forEach((item, index) => {
    //   nicknameList[index] = item.nickname;
    //   contentList[index] = item.content;
    // });
  
    // list[0] = nicknameList;
    // list[1] = contentList;
    const arr = [];
    const nickarr = [];
    const contarr = [];
    data.forEach((item) => {
      nickarr.push(item.nickname);
      contarr.push(item.content);
    });
  
    arr.push(nickarr);
    arr.push(contarr);
    //debugger;
    return arr;
  };

  const testItem = getDataFromBackend();
  debugger;
  //const [nicknames, setNicknames] = useState([]);
  //const [contents, setContents] = useState([]);
  const [nicknames, setNicknames] = useState(nickarr);
  const [contents, setContents] = useState(contarr);
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

  // input 태그 변화 감지
  // const [leftinputs, setLeftinputs] = useState({
  //   nickname_left: '',
  //   content_left: ''
  // });

  // const {nickname_left, content_left} = leftinputs;

  // const handleInputLeftChange = e => {
  //   const {name, value} = e.target;
  //   setLeftinputs({
  //     ...leftinputs,
  //     //[e.target.name]: e.target.value
  //     [name]: value
  //   });
  // };

  // console.log(leftinputs);

  // // 유저에게 보이는 부분 변화 감지
  // const [leftviews, setLeftviews] = useState({
  //   nickname_left_view: [],
  //   content_left_view: []
  // });

  // const {nickname_left_view, content_left_view} = leftviews

  // const submitLeft = () => {
  //   setLeftviews((prev) => {
  //     return [leftinputs, ...prev];
  //   })
  // }


  // ------------------------------------------------------------------

  // 아래 두 개는 delete한 내용 반영에 사용하기
  // const getDataFromBackend = async () => {
  //   const rest = await fetch("http://localhost:4000/list");
  //   const data = await rest.json();
  //   return data;
  // };

  // const addData = async () => {
  //   const data = await getDataFromBackend();
  //   return (
  //     <div>
  //       {data.map((value,index) => (
  //         <Textcontainer key={index} content={value.content}  nickname={value.nickname} />
  //       ))}
  //     </div>
  //   );
  // }

  function submitFormToNotion() {
    fetch("http://localhost:4000/submitFormToNotion", {
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
      console.log("success!", data);
      handleUpload();
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
  }

  return (
    <>
      <div>무언가 살아있다고 느낀 순간은 언제인가요?</div>
      <div>
        {nicknames.map((nickname, index) => {
          return <div key={index}>닉네임 : {nickname}, 내용 : {contents[index]}</div>
        })}
      </div>
      <div>
        <input type="leftanswer" name="content_left" value={inputCont}
         className="inputleft" placeholder="당신의 답변을 적어주세요." onChange={handleInputCont} />
        <input type="leftnickname" name="nickname_left" className="inputleft"
          value={inputName} placeholder="닉네임" onChange={handleInputName} required />
        <button onClick={submitFormToNotion}>보내기</button>
      </div>     
    </>     
  );
}

export default Left;
