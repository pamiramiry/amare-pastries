import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  breadcrumbJsonLd,
  localBusinessJsonLd,
  webSiteJsonLd,
} from "../../config/seo";

const SCRIPT_ID = "amare-json-ld";

function schemasForPath(pathname: string) {
  const schemas: object[] = [webSiteJsonLd()];

  if (pathname === "/") {
    schemas.push(localBusinessJsonLd());
    return schemas;
  }

  if (pathname === "/special-orders") {
    schemas.push(
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Order Ahead", path: "/special-orders" },
      ]),
    );
    return schemas;
  }

  return schemas;
}

export const JsonLd = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/menu") {
      document.getElementById(SCRIPT_ID)?.remove();
      return;
    }

    const payload = schemasForPath(pathname);
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(
      payload.length === 1 ? payload[0] : payload,
    );
  }, [pathname]);

  return null;
};
