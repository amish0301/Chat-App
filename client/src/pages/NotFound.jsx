import { Error as ErrorIcon } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Stack
        alignItems={"center"}
        spacing={"2rem"}
        justifyContent={"center"}
        height="100%"
      >
        <motion.div animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}>
          <ErrorIcon sx={{ fontSize: "10rem", color: "red" }} />
        </motion.div>
        <Typography variant="h1">404</Typography>
        <Typography variant="h3" color={'GrayText'}>Page Not Found</Typography>
        <Typography variant="subtitle2">
          The page you are looking for does not exist
        </Typography>
        <Button onClick={() => navigate('/')} sx={{ bgcolor: "blue", color: "white" }}>
          <ArrowBackIcon sx={{ fontSize: "2rem", marginRight: ".5rem" }} />
          Go Back to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;