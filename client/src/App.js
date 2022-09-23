import "./App.css";
import { Component, useState } from "react";
import Textcontainer from "./components/TextContainer";

function App() {
  // input 태그 변화 감지
  const [leftinputs, setLeftinputs] = useState({
    nickname_left: '',
    content_left: ''
  });
  const {nickname_left, content_left} = leftinputs;

  const handleInputLeftChange = e => {
    const {id, value} = e.target;
    setLeftinputs({
      ...leftinputs,
      //[e.target.name]: e.target.value
      [id]: value
    });
  };

  // input 태그 변화 감지
  const [rightinputs, setRightinputs] = useState({
    nickname_right: '',
    content_right: ''
  });
  const {nickname_right, content_right} = rightinputs;

  const handleInputRightChange = e => {
    setRightinputs({
      ...rightinputs,
      [e.target.name]: e.target.value
    });
  };

  // 유저에게 보이는 부분 변화 감지
  const [leftviews, setLeftviews] = useState({
    nickname_left_view: '',
    content_left_view: ''
  });
  const {nickname_left_view, content_left_view} = leftviews

  const submitLeft = () => {
    setLeftviews((prev) => {
      return [leftinputs, prev];
    })
  }

  // 유저에게 보이는 부분 변화 감지
  const [rightviews, setRightviews] = useState({
    nickname_right_view: '',
    content_right_view: ''
  });
  const {nickname_right_view, content_right_view} = rightviews

  const submitRight = () => {
    setRightviews((prev) => {
      return [rightviews, ...prev];
    })
  }
  

    // return data.map((value) => (
    //   //   console.log(value)
    //   DBbox = value.nickname;)
    // ));
    //   data.forEach((value) => {
    //     const div = document.createElement('div');
    //       div.classList.add('userContainer');
    //     console.log(value);
    //     div.innerHTML = `
    //           <h3>${value.name}</h3>
    //           <h3>${value.phone}</h3>
    //           <h3>${value.url}</h3>
    //       `;
    //     container.append(div);
    //   });
  // };

  //---> WMLALive - leftpage - Save the data
  function submitFormToNotion() {
    submitLeft();
    console.log("WMLAlive: " + nickname_left, content_left);
    fetch("http://localhost:4000/submitFormToNotion", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Nickname: nickname_left,
        Content: content_left,
      }),
    })
      .then((res) => {
        //submitLeft();
      })
      .then((data) => {
        console.log("success!", data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    //setNickname_1("");
    //setContent_1("");
    addData();
  }

  //---> WMLNALive - rightpage - Save the data
  function submitFormToNotion_2() {
    //console.log("WMLNAlive: " + nickname_2, content_2);
    fetch("http://localhost:4000/submitFormToNotion_2", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        //Nickname: nickname_2,
        //Content: content_2,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success!", data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    //setNickname_2("");
    //setContent_2("");
  }

  // const getDataFromBackend = async () => {
  //   const rest = await fetch("http://localhost:4000/datalist");
  //   const data = await rest.json();
  //   return data;
  // };

  return (
    <div className="App">
      <header>순간에 대해 말해주세요 : WMLAlive Archive</header>
      <main>
        {/* left page */}
        <div className="leftpage">
          <div>무언가 살아있다고 느낀 순간은 언제인가요?</div>
          <div id="answers">
            <Textcontainer />
            {/* <List data={getDataFromBackend}/> */}
              <div>닉네임 : {leftviews.nickname_left_view} , 내용 : {leftviews.content_left_view}</div>
              {/* {leftviews.map((view) => {
              return <div key={view}>닉네임 : {view.nickname_left_view} , 내용 : {view.content_left_view}</div>
            })} */}
          </div>
          <div id="form_div">
            {/* <form> */}
            <input
              type="leftanswer"
              id="content_left"
              value={content_left}
              className="inputleft"
              placeholder="당신의 답변을 적어주세요."
              onChange={handleInputLeftChange}
            />
            <input
              type="leftnickname"
              id="nickname_left"
              className="inputleft"
              value={nickname_left}
              placeholder="닉네임"
              onChange={handleInputLeftChange}
              required
            />
            <button onClick={submitFormToNotion}>보내기</button>
          {/* </form> */}
          </div>
        </div>

        {/* right page */}
        <div className="rightpage">
          <div>무언가 죽어있다고 느낀 순간은 언제인가요?</div>
          <div>2:contents</div>
          <div>
          {/* {rightviews.map((view) => {
              return <div key={view}>닉네임 : {view.nickname_right_view} , 내용 : {view.content_right_view}</div>
            })} */}
          </div>
          <form>
            <input
              type="rightanwser"
              id="content_2"
              value={content_right}
              className="inputright"
              placeholder="당신의 답변을 적어주세요."
              onChange={handleInputRightChange}
              required
            />

            <input
              type="rightnickname"
              id="nickname_2"
              value={nickname_right}
              className="inputright"
              placeholder="닉네임"
              onChange={handleInputRightChange}
              required
            />
            <button onClick={submitFormToNotion_2}>보내기</button>
          </form>
        </div>
      </main>
      <footer>© Suh Youri</footer>
    </div>
  );
}

//---> WMLALive - leftpage - Take the data from DB
const getDataFromBackend = async () => {
  const rest = await fetch("http://localhost:4000/movies");
  const data = await rest.json();
  console.log('getdatafrom');
  console.log(rest);
  return data;
};

const addData = async () => {
  console.log('addData');
  const data = await getDataFromBackend();
  console.log(data);
  return (
    <div>
      {data.map((value,index) => (
        <Textcontainer key={index} content={value.content}  nickname={value.nickname} />
        // <div>
        //   <li key={index++}>{value.nickname}{value.content}</li>
        // </div>
      ))}
    </div>
  );
  // const container = document.getElementById('Textcontainer');
  // container.innerHTML="";
  // data.forEach((value, index) => {
  //     const div = document.createElement('div');
  //     div.innerHTML = `
  //       <li id="${index}">닉네임 : ${value.nickname} | 답변 : ${value.content}</li>
  //     `;
  //     container.append(div);
  // })
}

// function Item(props) {
//   return (
//     <li>
//       별명 : {props.nickname}, 내용 : {props.content}
//     </li>
//   )
// }

// class List extends Component {
//   renderItem(i) {
//     return (
//       <Item value={this.props.data[i]}/>
//     )
//   }

//   render() {
//     return(
//       <div>
//         {this.renderItem(0)}
//         {this.renderItem(1)}
//       </div>
//     )
//   }
// }

addData();

export default App;
