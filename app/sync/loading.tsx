import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';

export default function Loading(){
  return (
    <Backdrop open sx={{ position:'fixed', inset:0, color:'#fff', zIndex:1301 }}>
      <Stack alignItems="center" spacing={1}>
        <CircularProgress/>
        <Typography variant="body2">동기화 화면 준비중...</Typography>
      </Stack>
    </Backdrop>
  );
}
