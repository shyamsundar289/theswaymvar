import { assets } from "../assets/asset-manifest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import filmTokensCss from "../styles/film-tokens.css?url";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { getSeoMetadata, BUSINESS_INFO, SITE_URL } from "@/config/seo";
import { JsonLd } from "@/components/seo/JsonLd";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "author", content: "The Swaymvar" },
      ...getSeoMetadata(
        "The Swaymvar — Wedding Photography & Films in Bikaner",
        BUSINESS_INFO.description,
        "/"
      ),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Allura&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: filmTokensCss,
      },
      { rel: "icon", href: assets.misc.favicon, type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BUSINESS_INFO.name,
    "url": SITE_URL
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": BUSINESS_INFO.name,
    "url": SITE_URL,
    "logo": `${SITE_URL}${assets.misc.favicon}`,
    "image": `${SITE_URL}${assets.misc.favicon}`,
    "description": BUSINESS_INFO.description,
    "founder": {
      "@type": "Person",
      "name": BUSINESS_INFO.founder
    },
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "sameAs": BUSINESS_INFO.social,
    "areaServed": BUSINESS_INFO.areaServed,
    "knowsAbout": BUSINESS_INFO.knowsAbout,
    "address": BUSINESS_INFO.address
  };

  return (
    <QueryClientProvider client={queryClient}>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <SmoothScroll />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}
