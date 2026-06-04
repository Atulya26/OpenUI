import type { CSSProperties, ReactNode } from 'react';
import iphoneFrameImage from '@/assets/devices/iphone-17-pro-frame.png';
import {
  iphoneFrameAsset,
  iphoneProTarget,
  iphoneSafeArea,
} from '@/tokens/device/iphone';

export type DeviceFrameProps = {
  children: ReactNode;
  /** Show safe-area hatch guides (dev overlay) */
  showSafeArea?: boolean;
  /** Scale entire frame (1 = 450px wide hardware asset) */
  scale?: number;
  label?: string;
};

/**
 * iPhone hardware frame (450×920) with system chrome baked into the PNG:
 * Dynamic Island, status bar, and home indicator.
 * Content renders in the screen slot behind the frame image.
 */
export function DeviceFrame({
  children,
  showSafeArea = false,
  scale = 0.85,
  label = `${iphoneProTarget.screenWidth}×${iphoneProTarget.screenHeight}`,
}: DeviceFrameProps) {
  const { width: fw, height: fh } = iphoneFrameAsset;
  const insetTop = `${(iphoneFrameAsset.screenOffsetY / fh) * 100}%`;
  const insetBottom = `${(iphoneFrameAsset.screenOffsetY / fh) * 100}%`;
  const insetLeft = `${(iphoneFrameAsset.screenOffsetX / fw) * 100}%`;
  const insetRight = `${(iphoneFrameAsset.screenOffsetX / fw) * 100}%`;

  const frameStyle = {
    '--device-frame-scale': scale,
    '--device-screen-radius': `${iphoneFrameAsset.screenCornerRadius * scale}px`,
    width: `${fw * scale}px`,
  } as CSSProperties;

  const screenStyle = {
    top: insetTop,
    right: insetRight,
    bottom: insetBottom,
    left: insetLeft,
  } as CSSProperties;

  return (
    <figure className="openui-device-frame" style={frameStyle}>
      <div className="openui-device-frame__wrap">
        <div
          className={`openui-device-frame__screen${showSafeArea ? ' openui-device-frame__screen--guides' : ''}`}
          style={screenStyle}
        >
          {showSafeArea ? (
            <div className="openui-device-frame__guides" aria-hidden>
              <div className="openui-device-frame__safe openui-device-frame__safe--top" />
              <div className="openui-device-frame__safe openui-device-frame__safe--bottom" />
            </div>
          ) : null}
          <div className="openui-device-frame__viewport">{children}</div>
        </div>
        <img
          className="openui-device-frame__hardware"
          src={iphoneFrameImage}
          alt=""
          width={fw}
          height={fh}
          draggable={false}
        />
      </div>
      {label ? (
        <figcaption className="openui-device-frame__caption">
          {label} · safe top {iphoneSafeArea.top}px · bottom{' '}
          {iphoneSafeArea.bottom}px
        </figcaption>
      ) : null}
    </figure>
  );
}
