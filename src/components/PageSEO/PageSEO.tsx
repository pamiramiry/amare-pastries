import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, getPageMeta } from "../../config/seo";

function upsertMeta(
  key: string,
  content: string,
  attr: "name" | "property" = "name",
) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export const PageSEO = (): null => {
  const { pathname } = useLocation();
  const meta = getPageMeta(pathname);
  const canonical = absoluteUrl(meta.path);
  const ogImage = absoluteUrl(meta.image ?? "/amare-3cups.png");

  useEffect(() => {
    document.title = meta.title;

    upsertMeta("description", meta.description);
    upsertMeta(
      "robots",
      meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    upsertMeta("googlebot", meta.noindex ? "noindex, nofollow" : "index, follow");

    upsertLink("canonical", canonical);

    upsertMeta("og:title", meta.title, "property");
    upsertMeta("og:description", meta.description, "property");
    upsertMeta("og:type", "website", "property");
    upsertMeta("og:url", canonical, "property");
    upsertMeta("og:image", ogImage, "property");
    upsertMeta("og:image:alt", `${meta.title} — Amare Pastry Co., Toronto`, "property");
    upsertMeta("og:locale", "en_CA", "property");
    upsertMeta("og:site_name", "Amare Pastry Co.", "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", meta.title);
    upsertMeta("twitter:description", meta.description);
    upsertMeta("twitter:image", ogImage);

    upsertMeta("geo.region", "CA-ON");
    upsertMeta("geo.placename", "Toronto");
    upsertMeta("geo.position", "43.684701;-79.4499849");
    upsertMeta("ICBM", "43.684701, -79.4499849");
  }, [meta.title, meta.description, meta.noindex, canonical, ogImage]);

  return null;
};
