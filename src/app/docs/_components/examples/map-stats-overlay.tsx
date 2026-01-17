type MapStatsOverlayProps = {
  zoom: number;
  pitch: number;
  bearing: number;
};

export function MapStatsOverlay({ zoom, pitch, bearing }: MapStatsOverlayProps) {
  return (
    <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg p-3 border border-border/50 shadow-lg">
      <div className="flex gap-4 text-sm">
        <div>
          <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Zoom</div>
          <div className="font-mono font-semibold">{zoom}</div>
        </div>
        <div>
          <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Pitch</div>
          <div className="font-mono font-semibold">{pitch}°</div>
        </div>
        <div>
          <div className="tracking-wider text-[10px] text-muted-foreground uppercase">Bearing</div>
          <div className="font-mono font-semibold">{bearing}°</div>
        </div>
      </div>
    </div>
  );
}
