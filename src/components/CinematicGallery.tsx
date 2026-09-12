import { VideoPlayer } from "./VideoPlayer";
const FILMS = [
  {
    src: "/media/VuNoBenLucProject.mp4",
    poster: "/media/VuNoBenLucProject.webp",
    title: "Vụ Nổ Bến Lức",
    meta: "Bến Lức, Long An / 2025",
    format: "21:9",
  },
  {
    src: "/media/Shot_Uni.mp4",
    poster: "/media/Shot_Uni.webp",
    title: "Passing through",
    meta: "Hồ Chí Minh / 2025",
    format: "7:10",
  },
  {
    src: "/media/Shot_7.mp4",
    poster: "/media/Shot_7.webp",
    title: "After rain",
    meta: "Vietnam / 2025",
    format: "4:5",
  },
  {
    src: "/media/Shot_6.mp4",
    poster: "/media/Shot_6.webp",
    title: "A slower morning",
    meta: "Vietnam / 2025",
    format: "4:5",
  },
  {
    src: "/media/Shot_1.mp4",
    poster: "/media/Shot_1.webp",
    title: "In motion",
    meta: "Phú Yên / 2025",
    format: "16:10",
  },
  {
    src: "/media/Shot_2.mp4",
    poster: "/media/Shot_2.webp",
    title: "Salt and light",
    meta: "Phú Yên / 2025",
    format: "4:5",
  },
  {
    src: "/media/PhuYenShort-1.mp4",
    poster: "/media/PhuYenShort-1.webp",
    title: "Southbound",
    meta: "Phú Yên / 2025",
    format: "4:5",
  },
];

export default function CinematicGallery() {
  return (
    <section className="films-section" aria-label="Film journal" data-reveal>
      <div className="films-intro">
        <div>
          <p className="eyebrow">Selected visual studies</p>
          <span>2025 / Vietnam</span>
        </div>
        <h2>
          Not postcards.
          <br />
          <i>Fragments of feeling.</i>
        </h2>
        <p>
          Travelling slowly enough to notice the texture of a place: light on
          concrete, a road after rain, the way a day slips into evening.
        </p>
      </div>
      <div className="films-grid">
        {FILMS.map((film, index) => (
          <article
            key={film.title}
            className={`film-card film-card--${index + 1}`}
          >
            <VideoPlayer
              src={film.src}
              poster={film.poster}
              label={film.title}
              className="film-card__video h-full w-full object-cover"
            />
            <div className="film-card__caption">
              <div>
                <p>
                  {film.meta} <span>— {film.format}</span>
                </p>
                <h3>{film.title}</h3>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="films-outro">
        Each frame is a small invitation to look twice.
      </p>
    </section>
  );
}
