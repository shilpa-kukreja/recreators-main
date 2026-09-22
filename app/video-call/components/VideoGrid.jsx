// "use client";
// import { useEffect, useMemo, useRef, useState } from 'react'; // ✅ useState moved up
// import PropTypes from 'prop-types';
// import VideoTile from './VideoTile';

// /** Simple RMS-based active-speaker detection on a MediaStream. */
// function useActiveSpeaker(streams) {
//   const ctxRef = useRef(null);
//   const rafRef = useRef(null);
//   const [activeId, setActiveId] = useState(null);

//   useEffect(() => {
//     const entries = Object.entries(streams || {}).filter(([, s]) => s);
//     if (!entries.length) return undefined;

//     const AC = window.AudioContext || window.webkitAudioContext;
//     if (!AC) return undefined;

//     const ctx = new AC();
//     ctxRef.current = ctx;

//     const analysers = entries.map(([id, stream]) => {
//       const source = ctx.createMediaStreamSource(stream);
//       const analyser = ctx.createAnalyser();
//       analyser.fftSize = 512;
//       source.connect(analyser);
//       return { id, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
//     });

//     let lastSwitch = 0;

//     const tick = () => {
//       const now = performance.now();
//       let loudest = null;
//       let max = 0;

//       analysers.forEach(({ id, analyser, data }) => {
//         analyser.getByteFrequencyData(data);
//         let sum = 0;
//         for (let i = 0; i < data.length; i += 1) sum += data[i];
//         const avg = sum / data.length;
//         if (avg > max) { max = avg; loudest = id; }
//       });

//       if (now - lastSwitch > 400) {
//         setActiveId(max > 12 ? loudest : null);
//         lastSwitch = now;
//       }
//       rafRef.current = requestAnimationFrame(tick);
//     };

//     rafRef.current = requestAnimationFrame(tick);

//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       ctx.close().catch(() => {});
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [JSON.stringify(Object.keys(streams || {}))]);

//   return activeId;
// }

// export default function VideoGrid({ participants = [], remoteStreams = {}, localStream, selfId, sharingId }) {
//   const activeId = useActiveSpeaker(remoteStreams);

//   const tiles = useMemo(
//     () =>
//       participants.map((p) => ({
//         ...p,
//         stream: p.socketId === selfId ? localStream : remoteStreams[p.socketId],
//         isLocal: p.socketId === selfId,
//       })),
//     [participants, remoteStreams, localStream, selfId]
//   );

//   const sharingTile = tiles.find((t) => t.socketId === sharingId);
//   const gridTiles = sharingTile ? tiles.filter((t) => t.socketId !== sharingId) : tiles;

//   // literal grid classes per branch — required for Tailwind JIT + `!` prefix
//   let cols = '!grid-cols-1';
//   if (gridTiles.length === 2) cols = '!grid-cols-1 md:!grid-cols-2';
//   else if (gridTiles.length <= 4) cols = '!grid-cols-1 sm:!grid-cols-2';
//   else if (gridTiles.length <= 9) cols = '!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3';
//   else if (gridTiles.length > 9) cols = '!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4';

//   return (
//     <div className="!flex !h-full !w-full !flex-col !gap-3">
//       {sharingTile && (
//         <VideoTile
//           {...sharingTile}
//           className="!min-h-0 !flex-[3]"
//           isActiveSpeaker={false}
//           stream={sharingTile.stream}
//         />
//       )}

//       <div className={`!grid !min-h-0 !flex-[2] !gap-3 ${cols}`}>
//         {gridTiles.map((t) => (
//           <VideoTile
//             key={t.socketId}
//             {...t}
//             className="!aspect-video !w-full"
//             isActiveSpeaker={activeId === t.socketId}
//           />
//         ))}

//         {gridTiles.length === 0 && !sharingTile && (
//           <div className="!col-span-full !flex !h-full !items-center !justify-center !text-sm !text-slate-500">
//             Waiting for others to join…
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// VideoGrid.propTypes = {
//   participants: PropTypes.array,
//   remoteStreams: PropTypes.object,
//   localStream: PropTypes.object,
//   selfId: PropTypes.string,
//   sharingId: PropTypes.string,
// };



'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import VideoTile from './VideoTile';

function useActiveSpeaker(streams) {
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const entries = Object.entries(streams || {}).filter(([, s]) => s);
    if (!entries.length) return undefined;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return undefined;

    const ctx = new AC();
    ctxRef.current = ctx;
    const analysers = entries.map(([id, stream]) => {
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      return { id, analyser, data: new Uint8Array(analyser.frequencyBinCount) };
    });
    let lastSwitch = 0;

    const tick = () => {
      const now = performance.now();
      let loudest = null;
      let max = 0;
      analysers.forEach(({ id, analyser, data }) => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i += 1) sum += data[i];
        const avg = sum / data.length;
        if (avg > max) { max = avg; loudest = id; }
      });
      if (now - lastSwitch > 400) {
        setActiveId(max > 12 ? loudest : null);
        lastSwitch = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); ctx.close().catch(() => {}); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(Object.keys(streams || {}))]);

  return activeId;
}

/** Track viewport width so we can pick the right column count. */
function useViewport() {
  const [vp, setVp] = useState('desktop');
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVp('mobile');
      else if (w < 1024) setVp('tablet');
      else setVp('desktop');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return vp;
}

export default function VideoGrid({
  participants = [],
  remoteStreams = {},
  localStream,
  selfId,
  sharingId,
}) {
  const activeId = useActiveSpeaker(remoteStreams);
  const viewport = useViewport();

  /* ---------- dedupe by socketId, self first ---------- */
  const unique = useMemo(() => {
    const seen = new Set();
    const out = [];
    const self = participants.find((p) => p.socketId === selfId);
    if (self) { out.push(self); seen.add(self.socketId); }
    for (const p of participants) {
      if (!p?.socketId || seen.has(p.socketId)) continue;
      seen.add(p.socketId);
      out.push(p);
    }
    return out;
  }, [participants, selfId]);

  const tiles = useMemo(
    () =>
      unique.map((p) => ({
        ...p,
        stream: p.socketId === selfId ? localStream : remoteStreams[p.socketId],
        isLocal: p.socketId === selfId,
      })),
    [unique, remoteStreams, localStream, selfId]
  );

  const n = tiles.length;

  /* ============================================================
     SCREEN SHARE MODE — main share + horizontal film strip
     ============================================================ */
  const sharingTile = sharingId ? tiles.find((t) => t.socketId === sharingId) : null;

  if (sharingTile) {
    const otherTiles = tiles.filter((t) => t.socketId !== sharingId);
    const stripHeight = viewport === 'mobile' ? 88 : 120;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          gap: 10,
          minHeight: 0,
        }}
      >
        {/* Main share — takes all remaining space */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <VideoTile
            {...sharingTile}
            isActiveSpeaker={false}
            className="!h-full !w-full"
          />
        </div>

        {/* Horizontal film strip */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: 8,
            height: stripHeight,
            minHeight: stripHeight,
            maxHeight: stripHeight,
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          {otherTiles.length === 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                color: '#64748b',
                fontSize: 12,
              }}
            >
              No other participants
            </div>
          ) : (
            otherTiles.map((t) => (
              <div
                key={t.socketId}
                style={{
                  height: '100%',
                  aspectRatio: '16 / 9',
                  flex: '0 0 auto',
                }}
              >
                <VideoTile
                  {...t}
                  className="!h-full !w-full"
                  isActiveSpeaker={activeId === t.socketId}
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  /* ============================================================
     EMPTY STATE
     ============================================================ */
  if (n === 0) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontSize: 14,
        }}
      >
        Waiting for others to join…
      </div>
    );
  }

  /* ============================================================
     SINGLE PARTICIPANT — centered, capped aspect
     ============================================================ */
  if (n === 1) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 960, aspectRatio: '16 / 9' }}>
          <VideoTile
            {...tiles[0]}
            isActiveSpeaker={false}
            className="!h-full !w-full"
          />
        </div>
      </div>
    );
  }

  /* ============================================================
     RESPONSIVE COLUMN COUNT
     ============================================================ */
  let cols = 1;

  if (viewport === 'mobile') {
    // Mobile: stack or 2-col for larger groups
    cols = n <= 1 ? 1 : 2;
  } else if (viewport === 'tablet') {
    if (n === 1) cols = 1;
    else if (n === 2) cols = 2;
    else if (n <= 4) cols = 2;
    else cols = 3;
  } else {
    // Desktop
    if (n === 1) cols = 1;
    else if (n === 2) cols = 2;
    else if (n === 3) cols = 2; // 2x2 grid, cleaner than 3 skinny tiles
    else if (n === 4) cols = 2;
    else if (n <= 6) cols = 3;
    else if (n <= 9) cols = 3;
    else cols = 4;
  }

  // On mobile with 3 participants and 2 cols, the last tile looks alone.
  // Flip to 1 col so they all stack nicely.
  if (viewport === 'mobile' && n === 3) cols = 1;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridAutoRows: 'minmax(0, 1fr)',
        gap: viewport === 'mobile' ? 8 : 12,
        height: '100%',
        width: '100%',
        minHeight: 0,
      }}
    >
      {tiles.map((t) => (
        <div key={t.socketId} style={{ minHeight: 0, minWidth: 0 }}>
          <VideoTile
            {...t}
            className="!h-full !w-full"
            isActiveSpeaker={activeId === t.socketId}
          />
        </div>
      ))}
    </div>
  );
}

VideoGrid.propTypes = {
  participants: PropTypes.array,
  remoteStreams: PropTypes.object,
  localStream: PropTypes.object,
  selfId: PropTypes.string,
  sharingId: PropTypes.string,
};