import style from "./Chat.module.css"

import { Input } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { useEffect, useState } from "react"

const Chat = (props) => {
const [messageList, setMessageList] = useState([])

useEffect(() => {
    // registra o listener para o evento "receive_message"
    // toda vez que o servidor emitir esse evento, adiciona a mensagem na lista 
    props.socket.on("receive_message", (data) => {
        // usa funcao callback para garantir que pega o estado mais recente
        setMessageList((current) => [...current, data]); 
    });

    // Cleanup: remover o listener quando o componente desmonta
    // Evita vazamento de memória e listeners duplicados
    return () => props.socket.off("receive_message");
}, [props.socket]);

  return (
    <div>
      <div className={style.chat_container}>

        <div className={style.chat_body}>

        </div>

      </div>
    </div>
  )
}

export default Chat