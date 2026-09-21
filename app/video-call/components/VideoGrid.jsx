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

export default function VideoGrid({
  participants = [],
  remoteStreams = {},
  localStream,
  selfId,
  sharingId,
}) {
  const activeId = useActiveSpeaker(remoteStreams);

  /* ---------- dedupe: self first, then others ---------- */
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
     SCREEN SHARE MODE — big shared content + horizontal film strip
     ============================================================ */
  if (sharingId) {
    const sharingTile = tiles.find((t) => t.socketId === sharingId);
    const otherTiles = tiles.filter((t) => t.socketId !== sharingId);

    if (sharingTile) {
      return (
        <div className="!flex !h-full !w-full !flex-col !gap-2 md:!gap-3">
          {/* Main share — takes all remaining height */}
          <div className="!min-h-0 !flex-1">
            <VideoTile
              {...sharingTile}
              isActiveSpeaker={false}
              className="!h-full !w-full"
            />
          </div>

          {/* Film strip — horizontal scroll if many */}
          <div className="!flex !h-20 !shrink-0 !gap-2 !overflow-x-auto !pb-1 md:!h-28">
            {otherTiles.map((t) => (
              <div key={t.socketId} className="!aspect-video !h-full !shrink-0">
                <VideoTile
                  {...t}
                  className="!h-full !w-full"
                  isActiveSpeaker={activeId === t.socketId}
                />
              </div>
            ))}
            {otherTiles.length === 0 && (
              <div className="!flex !h-full !w-full !items-center !justify-center !text-xs !text-slate-500">
                No other participants
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  /* ============================================================
     EMPTY STATE
     ============================================================ */
  if (n === 0) {
    return (
      <div className="!flex !h-full !w-full !items-center !justify-center !text-sm !text-slate-500">
        Waiting for others to join…
      </div>
    );
  }

  /* ============================================================
     SINGLE PARTICIPANT — centered, capped size (no stretching)
     ============================================================ */
  if (n === 1) {
    return (
      <div className="!flex !h-full !w-full !items-center !justify-center">
        <VideoTile
          {...tiles[0]}
          isActiveSpeaker={false}
          className="!aspect-video !w-full !max-w-5xl !max-h-full"
        />
      </div>
    );
  }

  /* ============================================================
     MULTI PARTICIPANT GRID
     – mobile first, then scaled per breakpoint
     – grid-auto-rows fills vertical space evenly
     ============================================================ */
  let cols = '!grid-cols-1';
  if (n === 2) {
    // 2 people: side-by-side on tablet+, stacked on phone
    cols = '!grid-cols-1 sm:!grid-cols-2';
  } else if (n === 3) {
    // 3 people: stacked mobile → 2 cols tablet → 3 cols desktop
    cols = '!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3';
  } else if (n === 4) {
    // 4 people: 2×2 everywhere (best for 4-person calls)
    cols = '!grid-cols-2';
  } else if (n <= 6) {
    // 5–6 people: 2 cols mobile → 3 cols desktop
    cols = '!grid-cols-2 lg:!grid-cols-3';
  } else if (n <= 9) {
    // 7–9 people: 2 cols mobile → 3 cols tablet+
    cols = '!grid-cols-2 sm:!grid-cols-3';
  } else {
    // 10+: 2 / 3 / 4 columns
    cols = '!grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-4';
  }

  return (
    <div
      className={`!grid !h-full !w-full !gap-2 md:!gap-3 ${cols}`}
      style={{ gridAutoRows: 'minmax(0, 1fr)' }}
    >
      {tiles.map((t) => (
        <VideoTile
          key={t.socketId}
          {...t}
          className="!h-full !w-full !min-h-0"
          isActiveSpeaker={activeId === t.socketId}
        />
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