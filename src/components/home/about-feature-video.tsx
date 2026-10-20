"use client"

import { Play, X } from "lucide-react"
import { useRef } from "react"
import { LazyVideo } from "@/components/ui/lazy-video"

type Feature = { video: string; image: string; alt: string; label: string; fullVideo: string; fullPoster: string; watchLabel: string; closeLabel: string }

/** The About feature box: a silent looping preview that opens the full video, with sound, in a player. */
export function AboutFeatureVideo({ feature }: { feature: Feature }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const player = useRef<HTMLVideoElement>(null)
  const open = () => {
    dialog.current?.showModal()
    player.current?.play().catch(() => {})
  }
  return <>
    <button type="button" className="about-feature about-feature-watch" onClick={open} aria-label={`${feature.watchLabel}: ${feature.alt}`}>
      <LazyVideo className="about-feature-video" src={feature.video} poster={feature.image} label="" />
      <span className="about-feature-play" aria-hidden="true"><Play size={18} fill="currentColor" />{feature.watchLabel}</span>
      <span>{feature.label}</span>
    </button>
    <dialog ref={dialog} className="about-video-dialog" aria-label={feature.alt}
      onClose={() => player.current?.pause()}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <video ref={player} src={feature.fullVideo} poster={feature.fullPoster} controls playsInline preload="none" aria-label={feature.alt} />
      <button type="button" className="hero-lightbox-close" aria-label={feature.closeLabel} onClick={() => dialog.current?.close()}><X size={20} aria-hidden="true" /></button>
    </dialog>
  </>
}
