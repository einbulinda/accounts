import { Button, Stack } from "@mui/material";
import React from "react";

const FormButtons = () => {
  return (
    <Stack my={3} justifyContent="center" spacing={3} direction="row">
      <Button variant="contained" color="primary" type="submit">
        Save Profile
      </Button>
      <Button variant="contained" color="secondary" type="reset">
        Clear Form
      </Button>
    </Stack>
  );
};

export default FormButtons;
