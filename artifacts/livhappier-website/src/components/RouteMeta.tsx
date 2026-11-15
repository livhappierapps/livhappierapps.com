import { Helmet } from "react-helmet-async";

interface RouteMetaProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const BASE = "https://livhappierapps.com";

export function RouteMeta({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = `${BASE}/logo.png`,
  jsonLd,
}: RouteMetaProps) {
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDesc = ogDescription ?? description;
  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
