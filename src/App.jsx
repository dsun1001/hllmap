import { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";
import {
  ChevronLeft,
  Copy,
  Maximize2,
  Menu,
  Minimize2,
  Moon,
  RotateCcw,
  Search,
  Sun,
  X,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import {
  VIEW_LABELS,
  GAMES,
  MAPS,
  getCanonicalUrl,
  getDefaultRouteForMap,
  getDetailPath,
  getFlagCredits,
  getFaction,
  getGame,
  getImageForRoute,
  getMapHistory,
  getMapsByGame,
  getPreviewCredits,
  getPreviewImageForMap,
  getRouteHeading,
  getSeo,
  getTeam,
  parseRoute
} from "./data/maps.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about.html" element={<AboutPage />} />
      <Route path="/:mapId/:teamSlug/:view" element={<DetailRoute />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function HomePage() {
  const [activeGame, setActiveGame] = useState(() => getSavedGame());
  const maps = getMapsByGame(activeGame);
  const seo = getSeo({ type: "home", path: "/" });

  return (
    <PageFrame seo={seo}>
      <main className="home-page">
        <HeaderActions />
        <section className="home-hero" aria-labelledby="home-title">
          <div className="brand-heading">
            <img src="/images/favicon/android-chrome-512x512.png" alt="" aria-hidden="true" />
            <h1 id="home-title">HLL Map</h1>
          </div>
          <p className="home-copy">
            Default garrisons locations and tank identification guides.
          </p>
          <GameTabs activeGame={activeGame} onSelect={game => {
            saveGame(game);
            setActiveGame(game);
          }} />
        </section>

        <section className="map-grid-section" aria-label={`${getGame(activeGame).label} maps`}>
          <div className="map-grid">
            {maps.map(map => (
              <MapCard key={map.id} map={map} />
            ))}
          </div>
        </section>
        <SiteFooter />
      </main>
      <VisitorCount />
    </PageFrame>
  );
}

function DetailRoute() {
  const params = useParams();
  const route = parseRoute(`/${params.mapId}/${params.teamSlug}/${params.view}`);

  if (route.type === "redirect") return <Navigate to={route.to} replace />;
  if (route.type !== "detail") return <NotFoundPage />;

  return <MapDetailPage route={route} />;
}

function MapDetailPage({ route }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const maps = getMapsByGame(route.map.game);
  const filteredMaps = maps.filter(map => map.label.toLowerCase().includes(search.toLowerCase()));
  const shareUrl = getCanonicalUrl(route.path);
  const hasTankView = Boolean(route.team.tankImage);
  const seo = getSeo(route);

  function goToMap(mapId) {
    const nextMap = MAPS.find(map => map.id === mapId);
    const nextRoute = getDefaultRouteForMap(nextMap, route.team.slug, route.view);
    navigate(nextRoute.path);
  }

  function goToGame(gameId) {
    const nextMap = getMapsByGame(gameId)[0];
    const nextRoute = getDefaultRouteForMap(nextMap);
    saveGame(gameId);
    navigate(nextRoute.path);
  }

  return (
    <PageFrame seo={seo}>
      <div className="app-shell">
        <button className="sidebar-show" type="button" onClick={() => setSidebarOpen(true)} aria-label="Show map list">
          <Menu size={18} />
          <span>Maps</span>
        </button>

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`} aria-label="Map list">
          <div className="sidebar-header">
            <div>
              <h2>{getGame(route.map.game).label}</h2>
            </div>
            <button className="icon-button close-sidebar" type="button" onClick={() => setSidebarOpen(false)} aria-label="Hide map list">
              <X size={18} />
            </button>
          </div>
          <label className="search-field">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">Search maps</span>
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search maps..." />
          </label>
          <div className="sidebar-card-list">
            {filteredMaps.map(map => (
              <SidebarMapCard key={map.id} map={map} currentRoute={route} onNavigate={() => setSidebarOpen(false)} />
            ))}
          </div>
        </aside>

        {sidebarOpen && <button className="sidebar-overlay" type="button" aria-label="Close map list" onClick={() => setSidebarOpen(false)} />}

        <main className="content">
          <HeaderActions />
          <section className="tool-header" aria-labelledby="page-title">
            <Link className="eyebrow eyebrow-link detail-brand-link" to="/">
              <img src="/images/favicon/android-chrome-512x512.png" alt="" aria-hidden="true" />
              <span>{getGame(route.map.game).label}</span>
            </Link>
            <RouteTitle route={route} />
            <div className="control-bar">
              <GameTabs activeGame={route.map.game} onSelect={goToGame} compact />
              <label className="select-control">
                <span>Map</span>
                <select value={route.map.id} onChange={event => goToMap(event.target.value)}>
                  {maps.map(map => (
                    <option key={map.id} value={map.id}>{map.label}</option>
                  ))}
                </select>
              </label>
              <SegmentedLinks
                label="Team"
                options={route.map.teams.map(team => ({
                  label: team.label,
                  team,
                  active: team.slug === route.team.slug,
                  to: getDetailPath(route.map, team, team.tankImage && route.view === "tanks" ? "tanks" : "map")
                }))}
              />
              {hasTankView && (
                <SegmentedLinks
                  label="View"
                  options={[
                    { label: "Map", active: route.view === "map", to: getDetailPath(route.map, route.team, "map") },
                    { label: "Tanks", active: route.view === "tanks", to: getDetailPath(route.map, route.team, "tanks") }
                  ]}
                />
              )}
            </div>
          </section>

          <MapViewport route={route} />
          <div className="map-actions-row">
            <CopyLinkButton url={shareUrl} title={seo.title} />
          </div>
          <MapHistory route={route} />
          <SiteFooter />
        </main>
      </div>
      <VisitorCount />
    </PageFrame>
  );
}

function MapViewport({ route }) {
  const [zoomKit, setZoomKit] = useState(null);
  const [fullscreenMode, setFullscreenMode] = useState(null);
  const containerRef = useRef(null);
  const imageSrc = getImageForRoute(route);
  const alt = `${getRouteHeading(route)} map image`;
  const resetKey = `${route.map.id}-${route.team.slug}-${route.view}`;
  const isFullscreen = Boolean(fullscreenMode);

  useEffect(() => {
    let mounted = true;
    import("react-zoom-pan-pinch").then(module => {
      if (mounted) {
        setZoomKit({
          TransformWrapper: module.TransformWrapper,
          TransformComponent: module.TransformComponent
        });
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function syncFullscreenState() {
      const element = getFullscreenElement();
      if (element === containerRef.current) {
        setFullscreenMode("native");
      } else if (fullscreenMode === "native") {
        setFullscreenMode(null);
      }
    }

    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);
    document.addEventListener("MSFullscreenChange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
      document.removeEventListener("MSFullscreenChange", syncFullscreenState);
    };
  }, [fullscreenMode]);

  useEffect(() => {
    if (!isFullscreen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  async function enterFullscreen() {
    const element = containerRef.current;
    if (!element) return;

    if (fullscreenMode === "native" || getFullscreenElement() === element) {
      await exitFullscreen();
      setFullscreenMode(null);
      return;
    }

    if (fullscreenMode === "fallback") {
      setFullscreenMode(null);
      return;
    }

    if (shouldUseFallbackFullscreen()) {
      setFullscreenMode("fallback");
      return;
    }

    try {
      await requestFullscreen(element);
      setFullscreenMode("native");
    } catch (error) {
      setFullscreenMode("fallback");
    }
  }

  if (!zoomKit) {
    return (
      <section className={`map-stage ${isFullscreen ? "is-fullscreen" : ""}`} ref={containerRef} aria-label="Map image">
        <img className="map-image plain" src={imageSrc} alt={alt} />
      </section>
    );
  }

  const { TransformWrapper, TransformComponent } = zoomKit;

  return (
    <section className={`map-stage ${isFullscreen ? "is-fullscreen" : ""}`} ref={containerRef} aria-label="Map image">
      <TransformWrapper
        key={resetKey}
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit
        limitToBounds
        wheel={{ step: 0.12 }}
        pinch={{ step: 5 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ mode: "zoomIn", step: 0.7 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="map-toolbar" aria-label="Map zoom controls">
              <ToolbarButton label="Zoom in" onClick={() => zoomIn(0.35)} icon={<ZoomIn size={18} />} />
              <ToolbarButton label="Zoom out" onClick={() => zoomOut(0.35)} icon={<ZoomOut size={18} />} />
              <ToolbarButton label="Reset view" onClick={() => resetTransform()} icon={<RotateCcw size={18} />} />
              <ToolbarButton
                label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                onClick={enterFullscreen}
                icon={isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              />
            </div>
            <TransformComponent wrapperClass="transform-wrapper" contentClass="transform-content">
              <img className="map-image" src={imageSrc} alt={alt} draggable="false" />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </section>
  );
}

function MapCard({ map }) {
  const defaultRoute = getDefaultRouteForMap(map);
  const previewImage = getPreviewImageForMap(map);
  return (
    <article className="map-card">
      <Link className="map-card-image" to={defaultRoute.path} aria-label={`Open ${map.label}`}>
        <img src={previewImage} alt={`${map.label} preview`} loading="lazy" />
      </Link>
      <div className="map-card-body">
        <h2>{map.label}</h2>
        <div className="map-card-actions">
          {map.teams.map(team => (
            <Link key={team.slug} className="small-button" to={getDetailPath(map, team, "map")}>
              <TeamLabel team={team} />
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

function MapHistory({ route }) {
  const history = getMapHistory(route.map);
  if (!history) return null;

  return (
    <section className="history-section" aria-labelledby="history-title">
      <p className="history-summary">{history.summary}</p>
      <div className="history-objectives">
        {route.map.teams.map(team => {
          const objective = history.objectives[team.id];
          if (!objective) return null;
          return (
            <article className="history-objective" key={team.id}>
              <h3>
                <TeamLabel team={team} />
                <span>Objective</span>
              </h3>
              <p>{objective}</p>
            </article>
          );
        })}
      </div>
      <p className="history-outcome">
        {history.outcome}
      </p>
    </section>
  );
}

function RouteTitle({ route }) {
  const faction = getFaction(route.team.faction);

  return (
    <h1 id="page-title" className="route-title" aria-label={getRouteHeading(route)}>
      {faction && <img className="route-title-flag" src={faction.flagImage} alt="" aria-hidden="true" />}
      <span className="route-title-text">
        <span>{route.map.label}</span>
        <span>{route.team.label}</span>
        <span>{VIEW_LABELS[route.view]}</span>
      </span>
    </h1>
  );
}

function TeamLabel({ team }) {
  const faction = getFaction(team.faction);

  return (
    <span className="team-label" title={faction?.label || team.label}>
      {faction && <img className="flag-image" src={faction.flagImage} alt="" aria-hidden="true" />}
      <span>{team.label}</span>
      {faction && <span className="sr-only"> ({faction.label})</span>}
    </span>
  );
}

function SidebarMapCard({ map, currentRoute, onNavigate }) {
  return (
    <article className={`side-map-card ${map.id === currentRoute.map.id ? "active" : ""}`}>
      <h3>{map.label}</h3>
      <div className="side-map-actions">
        {map.teams.map(team => {
          const view = currentRoute.view === "tanks" && team.tankImage ? "tanks" : "map";
          return (
            <Link
              key={team.slug}
              className={team.slug === currentRoute.team.slug && map.id === currentRoute.map.id ? "active" : ""}
              to={getDetailPath(map, team, view)}
              onClick={onNavigate}
            >
              <TeamLabel team={team} />
            </Link>
          );
        })}
      </div>
    </article>
  );
}

function GameTabs({ activeGame, onSelect, compact = false }) {
  return (
    <div className={`segmented game-tabs ${compact ? "compact" : ""}`} role="tablist" aria-label="Game">
      {GAMES.map(game => (
        <button
          key={game.id}
          type="button"
          className={game.id === activeGame ? "active" : ""}
          onClick={() => onSelect(game.id)}
          role="tab"
          aria-selected={game.id === activeGame}
        >
          {compact ? game.shortLabel : game.label}
        </button>
      ))}
    </div>
  );
}

function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
}

function requestFullscreen(element) {
  const request = element.requestFullscreen || element.webkitRequestFullscreen || element.msRequestFullscreen;
  if (!request) return Promise.reject(new Error("Fullscreen is not supported"));
  return Promise.resolve(request.call(element));
}

function exitFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
  if (!exit) return Promise.resolve();
  return Promise.resolve(exit.call(document));
}

function shouldUseFallbackFullscreen() {
  return window.matchMedia?.("(max-width: 640px)").matches || !document.fullscreenEnabled;
}

function SegmentedLinks({ label, options }) {
  return (
    <div className="segmented-control" aria-label={label}>
      <span>{label}</span>
      <div className="segmented compact">
        {options.map(option => (
          <Link key={option.to + option.label} className={option.active ? "active" : ""} to={option.to}>
            {option.team ? <TeamLabel team={option.team} /> : option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function CopyLinkButton({ url, title }) {
  const [status, setStatus] = useState("");

  async function copyLink() {
    setStatus("");
    try {
      await writeToClipboard(url);
      setStatus("Copied");
    } catch (error) {
      setStatus("Unable to copy");
    }
  }

  return (
    <div className="share-control">
      <button className="command-button" type="button" onClick={copyLink} aria-label={`Copy link to ${title}`}>
        <Copy size={18} />
        <span>Copy link</span>
      </button>
      {status && <span className="status-text" role="status">{status}</span>}
    </div>
  );
}

async function writeToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const copied = document.execCommand("copy");
    if (!copied) throw new Error("Copy command failed");
  } finally {
    document.body.removeChild(textarea);
  }
}

function HeaderActions() {
  return (
    <div className="header-actions">
      <ThemeToggle />
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.body.classList.toggle("light", initial === "light");
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.body.classList.toggle("light", nextTheme === "light");
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <button className="theme-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

function PageFrame({ seo, children }) {
  useSeo(seo);
  return children;
}

function useSeo(seo) {
  useEffect(() => {
    document.title = seo.title;
    setMeta("description", seo.description);
    setLink("canonical", seo.canonical);
    setProperty("og:title", seo.title);
    setProperty("og:description", seo.description);
    setProperty("og:url", seo.canonical);
    setProperty("og:image", seo.image);
    setProperty("og:type", "website");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("twitter:image", seo.image);
  }, [seo]);
}

function AboutPage() {
  const seo = getSeo({ type: "about", path: "/about" });
  return (
    <PageFrame seo={seo}>
      <main className="about-page">
        <HeaderActions />
        <Link className="back-link" to="/">
          <ChevronLeft size={18} />
          <span>Back to maps</span>
        </Link>
        <h1>About</h1>
        <p>
          <strong>hllmap.com</strong> is a fan-made tool for viewing Offensive game-mode default garrison locations in <em>Hell Let Loose</em> and <em>Hell Let Loose: Vietnam</em>.
        </p>
        <p>
          Use the game, map, and team selectors to view different layouts. This project is{" "}
          <a href="https://github.com/dsun1001/hllmap" target="_blank" rel="noopener noreferrer">open source</a> and not affiliated with Black Matter or Team17.
        </p>
        <p>
          If you find <strong>hllmap.com</strong> useful and would like{" "}
          <a href="https://coff.ee/grogufan" target="_blank" rel="noopener noreferrer">to contribute to website hosting costs</a>, it would be greatly appreciated.
        </p>
        <div className="cat-row">
          <img className="about-cat" src="/images/cat.gif" alt="" aria-hidden="true" />
        </div>
        <details className="credits-section">
          <summary>Image Credits</summary>
          <article className="credit-item">
            <h3>Map Images and Inspiration</h3>
            <p>
              Credited to the{" "}
              <a href="https://www.reddit.com/r/HellLetLoose/comments/1ejip8e/default_garrison_ultimate_guide_2024/" target="_blank" rel="noopener noreferrer">
                Default Garrison Ultimate Guide
              </a>{" "}
              and the excellent <a href="https://mattw.io/maps-let-loose/" target="_blank" rel="noopener noreferrer">Maps Let Loose</a> tool.
            </p>
          </article>
          <p>
            Landing page preview images are sourced from Wikimedia Commons files with public-domain or Creative Commons licensing.
          </p>
          <div className="credits-list">
            {getPreviewCredits().map(({ map, credit }) => (
              <article className="credit-item" key={map.id}>
                <h3>{map.label}</h3>
                <p>
                  <a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.title}</a>
                  {" "}by {credit.author}. {credit.license}.
                </p>
              </article>
            ))}
          </div>
          <h3 className="credits-subheading">Faction Flags</h3>
          <div className="credits-list">
            {getFlagCredits().map(credit => (
              <article className="credit-item" key={credit.label}>
                <h3>{credit.label}</h3>
                <p>
                  <a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.title}</a>
                  {" "}{credit.license}.
                </p>
              </article>
            ))}
          </div>
        </details>
      </main>
      <VisitorCount />
    </PageFrame>
  );
}

function NotFoundPage() {
  const seo = getSeo({ type: "home", path: "/" });
  return (
    <PageFrame seo={{ ...seo, title: "HLL Map - Page Not Found" }}>
      <main className="not-found">
        <HeaderActions />
        <h1>Map not found</h1>
        <p>The requested map route is not available.</p>
        <Link className="command-button" to="/">Open map picker</Link>
      </main>
    </PageFrame>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        <strong>Default Garrisons</strong> have a 10 second spawn timer and can only be destroyed with satchels, molotovs, flamethrowers, or by manually dismantling them.
      </p>
      <p>
        If you find <strong>hllmap.com</strong> useful,{" "}
        <a href="https://coff.ee/grogufan" target="_blank" rel="noopener noreferrer">contributing to hosting costs</a> is appreciated.
      </p>
      <Link to="/about">About</Link>
    </footer>
  );
}

function VisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const countKey = "visitorCount";
    const timeKey = "visitorCountTime";
    const cacheMs = 60 * 60 * 1000;
    const savedCount = window.localStorage.getItem(countKey);
    const savedTime = window.localStorage.getItem(timeKey);

    if (savedCount && savedTime && Date.now() - Number(savedTime) < cacheMs) {
      setCount(savedCount);
      return;
    }

    fetch("https://l9k8ekxqn3.execute-api.us-east-1.amazonaws.com/counter")
      .then(response => response.json())
      .then(data => {
        setCount(data.count);
        window.localStorage.setItem(countKey, data.count);
        window.localStorage.setItem(timeKey, Date.now().toString());
      })
      .catch(() => setCount(savedCount));
  }, []);

  return <p className="visitor-count">Visitors: {count === null ? "..." : Number(count).toLocaleString()}</p>;
}

function ToolbarButton({ label, icon, onClick }) {
  return (
    <button className="icon-button" type="button" onClick={onClick} aria-label={label} title={label}>
      {icon}
    </button>
  );
}

function setMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function setProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function setLink(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function getSavedGame() {
  if (typeof window === "undefined") return "hll";
  const saved = window.localStorage.getItem("selectedGame");
  return GAMES.some(game => game.id === saved) ? saved : "hll";
}

function saveGame(gameId) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("selectedGame", gameId);
  }
}
