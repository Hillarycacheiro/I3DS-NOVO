import style from "./Chat.module.css";

import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";

const Chat = (props) => {
  const [messageList, setMessageList] = useState([]);

  const messageRef = useRef();

  useEffect(() => {
    // Registra o listener para o evento "receive_message"
    // Toda vez que o servidor emitir esse evento, adiciona a mensagem na lista
    props.socket.on("receive_message", (data) => {
      // usa função callback para garantir que pega o estado mais recente
      setMessageList((current) => [...current, data]);
    });

    // Cleanup: remover o listener quando o componente desmonta
    // Evita vazamento de memória e listeners duplicados
    return () => props.socket.off("receive_message");
  }, [props.socket]);

  const handleSubmit = () => {
    const message = messageRef.current.value;

    if (!message.trim()) return;

    props.socket.emit("message", message);

    messageRef.current.value = "";
    message.Ref.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div>
      <div className={style.chat_container}>
        <div className={style.chat_body}>
          {messageList.map((message, index) => (
            <div
              className={`${style.message_container} ${message.authorId === props.socket.id && style.message_mine}`}
              key={index}
            >
              <div className={style.message_author}>
                <strong>{message.author}</strong>
              </div>
              <div className={style.message_text}>{message.text}</div>
            </div>
          ))}
        </div>

        <div className={style.chat_footer}>
          <Input
            inputRef={messageRef}
            placeholder="Mensagem"
            onKeyDown={(e) => getEnterKey(e)}
            fullWidth
          />

          <SendIcon
            sx={{ m: 1, cursor: "pointer" }}
            style={{ color: "#129d93" }}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;