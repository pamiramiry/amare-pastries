import { useEffect } from "react";

type JsonLdScriptProps = {
  id: string;
  data: object | object[];
};

export const JsonLdScript = ({ id, data }: JsonLdScriptProps): null => {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(
      Array.isArray(data) && data.length === 1 ? data[0] : data,
    );
    return () => script?.remove();
  }, [id, JSON.stringify(data)]);

  return null;
};
