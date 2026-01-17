import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type ControlValue = [number];

type MapControlsProps = {
  zoom: ControlValue;
  pitch: ControlValue;
  bearing: ControlValue;
  onZoomChange: (value: ControlValue) => void;
  onPitchChange: (value: ControlValue) => void;
  onBearingChange: (value: ControlValue) => void;
};

export function MapControls({
  zoom,
  pitch,
  bearing,
  onZoomChange,
  onPitchChange,
  onBearingChange,
}: MapControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
      <div className="space-y-2">
        <Label htmlFor="zoom">
          Zoom: <span className="font-mono text-muted-foreground">{zoom[0]}</span>
        </Label>
        <Slider
          id="zoom"
          min={0}
          max={20}
          step={0.5}
          value={zoom}
          onValueChange={onZoomChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pitch">
          Pitch: <span className="font-mono text-muted-foreground">{pitch[0]}°</span>
        </Label>
        <Slider
          id="pitch"
          min={0}
          max={85}
          step={1}
          value={pitch}
          onValueChange={onPitchChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bearing">
          Bearing: <span className="font-mono text-muted-foreground">{bearing[0]}°</span>
        </Label>
        <Slider
          id="bearing"
          min={-180}
          max={180}
          step={1}
          value={bearing}
          onValueChange={onBearingChange}
        />
      </div>
    </div>
  );
}
