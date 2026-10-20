export type GalleryPhoto = {
  src: string
  alt: string
  caption: string
  /** CSS object-position for the crop, e.g. "50% 20%". */
  position: string
  /** Also show this photo in the hero's photo card. */
  showInHero: boolean
}

/** Every photo on the site's gallery page. The ones marked showInHero also rotate in the hero card. */
export const galleryContent = {
  kicker: "PHOTO GALLERY",
  title: "Moments behind the work.",
  description: "Classes I’ve taught, rooms I’ve learned in and the people I build alongside.",
  viewAllLabel: "View all photos",
  backLabel: "Back to home",
  emptyLabel: "Photos are on their way.",
  photos: [
    { src: "/images/gallery/laptop-yellow-wall.jpg", alt: "Victor working on his laptop against a yellow wall, headphones around his neck", caption: "Heads down, headphones on.", position: "50% 55%", showInHero: true },
    { src: "/images/gallery/teaching-quiz-class.jpg", alt: "Victor explaining a quiz on the big screen to a class at laptops", caption: "Walking the class through it.", position: "35% 40%", showInHero: true },
    { src: "/images/gallery/kode10x-certificates.jpg", alt: "A Kode10x software engineering cohort holding their certificates of completion", caption: "Certificate day at Kode10x.", position: "50% 30%", showInHero: true },
    { src: "/images/gallery/class-quiz-lab.jpg", alt: "Victor at his laptop at the front of a classroom while students take a quiz", caption: "Quiz day in the lab.", position: "45% 35%", showInHero: true },
    { src: "/images/gallery/teaching-quiz-review.jpg", alt: "Victor presenting quiz answers on a screen to a class at laptops", caption: "Going over the answers together.", position: "38% 45%", showInHero: true },
    { src: "/images/me2.jpg", alt: "Victor thinking beside his laptop", caption: "Always a little curious.", position: "50% 14%", showInHero: true },
    { src: "/images/me3.jpg", alt: "Victor at his laptop in Lagos", caption: "Ideas start with people.", position: "50% 14%", showInHero: true },
    { src: "/images/gallery/microsoft-ai-event.jpg", alt: "Victor standing in front of a Microsoft banner at a tech event, wearing a guest lanyard", caption: "In the room at a Microsoft event.", position: "50% 25%", showInHero: false },
    { src: "/images/gallery/teaching-code-kode10x.jpg", alt: "Victor pointing at code on a large screen while teaching a Kode10x class", caption: "Explaining it is how I learn it.", position: "50% 40%", showInHero: false },
    { src: "/images/hero/victor-arsenal-photo.jpeg", alt: "Victor outside in Lagos", caption: "Lagos, between builds.", position: "52% 15%", showInHero: false },
    { src: "/images/about/victor-editorial-cutout.png", alt: "Grayscale portrait of Victor Onyemaechi", caption: "The human behind the code.", position: "50% 20%", showInHero: false },
  ] as GalleryPhoto[],
}
