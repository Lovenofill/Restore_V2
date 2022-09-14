import { Button, ButtonGroup, Container } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import agent from "../../App/api/agent";

export default function AboutPage() {
  toast.success("🦄 Wow so easy!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
  return (
    <Container>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={()=>agent.TestError.get404Error().catch(error => console.log(error))}>Test 400 Errors</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Container>
  );
}
