import React from "react";
import styled from "styled-components";

const LoginButton = props => {
  return (
    <div className="login-conainer">
      <Button>Login</Button>
    </div>
  );
};

export default LoginButton;

const Button = styled.button`
  background: #319cd6;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid white;
  border-radius: 3px;
  width: 8%;
  display: inline-block;
`;
