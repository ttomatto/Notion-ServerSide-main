//---> WMLALive - leftpage - Take the data from DB
// import { useDebugValue } from "react";
// import Textcontainer from "./TextContainer";

export default function CommentHandler(messages, name) {
  const getDataFromBackend = async () => {
    const rest = await fetch("http://localhost:4000/movies");
    const data = await rest.json();
    // console.log('getDatafrombackend:');
    // console.log(data);
    return data;
  };

  // const addData = async () => {
  //   const data = await getDataFromBackend();
  //     return (
  //         <div>data.map(value => (<CommentHandler content={value.content} />)</div>
  //     );
      
        //   console.log(value)
        //   <Textcontainer message={value.content} name={value.nickname} />
    //   );
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
  };

// addData();
    // <ScrollToBottom className="messages">
    //   {messages.map((message, i) => (
    //     <div key={i}>
    //       <Message message={message} name={name} />
    //     </div>
    //   ))}
    // </ScrollToBottom>;
  //<p>${value.tags.join(', ')}</p>
// }
