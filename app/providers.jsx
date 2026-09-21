'use client';


import { VideoRoomProvider } from './video-call/context/VideoRoomContext';

export default function Providers({ children }) {
  return (
   
      <VideoRoomProvider>{children}</VideoRoomProvider>
 
  );
}