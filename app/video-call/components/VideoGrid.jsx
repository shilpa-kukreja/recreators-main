"use client";
import { useEffect, useMemo, useRef, useState } from 'react'; // ✅ useState moved up
import PropTypes from 'prop-types';
import VideoTile from './VideoTile';

/** Simple RMS-based active-speaker detection on a MediaStream. */
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

    return () => {
      cancelAnimationFrame(rafRef.current);
      ctx.close().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(Object.keys(streams || {}))]);

  return activeId;
}

export default function VideoGrid({ participants = [], remoteStreams = {}, localStream, selfId, sharingId }) {
  const activeId = useActiveSpeaker(remoteStreams);

  const tiles = useMemo(
    () =>
      participants.map((p) => ({
        ...p,
        stream: p.socketId === selfId ? localStream : remoteStreams[p.socketId],
        isLocal: p.socketId === selfId,
      })),
    [participants, remoteStreams, localStream, selfId]
  );

  const sharingTile = tiles.find((t) => t.socketId === sharingId);
  const gridTiles = sharingTile ? tiles.filter((t) => t.socketId !== sharingId) : tiles;

  // literal grid classes per branch — required for Tailwind JIT + `!` prefix
  let cols = '!grid-cols-1';
  if (gridTiles.length === 2) cols = '!grid-cols-1 md:!grid-cols-2';
  else if (gridTiles.length <= 4) cols = '!grid-cols-1 sm:!grid-cols-2';
  else if (gridTiles.length <= 9) cols = '!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3';
  else if (gridTiles.length > 9) cols = '!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4';

  return (
    <div className="!flex !h-full !w-full !flex-col !gap-3">
      {sharingTile && (
        <VideoTile
          {...sharingTile}
          className="!min-h-0 !flex-[3]"
          isActiveSpeaker={false}
          stream={sharingTile.stream}
        />
      )}

      <div className={`!grid !min-h-0 !flex-[2] !gap-3 ${cols}`}>
        {gridTiles.map((t) => (
          <VideoTile
            key={t.socketId}
            {...t}
            className="!aspect-video !w-full"
            isActiveSpeaker={activeId === t.socketId}
          />
        ))}

        {gridTiles.length === 0 && !sharingTile && (
          <div className="!col-span-full !flex !h-full !items-center !justify-center !text-sm !text-slate-500">
            Waiting for others to join…
          </div>
        )}
      </div>
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