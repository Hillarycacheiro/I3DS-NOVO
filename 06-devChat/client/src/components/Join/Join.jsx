import { useRef } from "react";
import style from "./Join.module.css";

import { Input, Button } from "@mui/material";
import io from "socket.io-client";

const Join = (props) => {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;

    const socket = io.connect("http://localhost:3001");
    socket.emit("set_username", username);

    props.setSocket(socket);
    props.setChatVisibility(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <div className={style.dev_logo}>
        <img src="" alt="Logo do DevChat" />
      </div>

      <div className={style.join_container}>
        <h2>Bem-vindo ao devChat!</h2>
        <Input
          inputRef={usernameRef}
          placeholder="Nome de usuário"
          onKeyDown={handleKeyPress}
        />
        <Button
          sx={{ mt: 2, mb: 2 }}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Entrar
        </Button>
      </div>
    </>
  );
};

export default Join;