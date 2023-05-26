import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import Link from "next/link";
import React from "react";

function _error() {
  return (
    <Container>
      <Card
        sx={{
          p: 10,
        }}>
        <CardContent>
          <Typography gutterBottom className='font-main' variant='h3'>
            Page not found
          </Typography>
          <Typography component='div' gutterBottom aria-label='Pensive emoji'>
            요청하신 페이지를 찾지 못 했어요 😔
            {process.env.NODE_ENV === "development" ? (
              <Typography component='div' variant='body2' color='GrayText'>
                <br />
                <Chip label='Dev Alert' /> <code>src/pages/</code>에서 페이지를
                만들어보세요!
                <br />
              </Typography>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} href='/'>
            Go home
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default _error;
