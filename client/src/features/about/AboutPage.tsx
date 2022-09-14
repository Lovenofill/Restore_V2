import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import agent from "../../App/api/agent";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  function getValidationError() {
    agent.TestError.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }
  toast.success("🦄 Wow so easy!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
    <Container>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() =>
            agent.TestError.get404Error().catch((error) => console.log(error))
          }
        >
          Test 404 Errors
        </Button>
        <Button
          onClick={() =>
            agent.TestError.get401Error().catch((error) => console.log(error))
          }
        >
          Test 401 Errors
        </Button>
        <Button
          onClick={() =>
            agent.TestError.get400Error().catch((error) => console.log(error))
          }
        >
          Test 400 Errors
        </Button>
        <Button
          onClick={() =>
            agent.TestError.get500Error().catch((error) => console.log(error))
          }
        >
          Test 500 Errors
        </Button>
        <Button onClick={() => getValidationError()}>
          Test Validate Errors
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
