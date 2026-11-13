import Script from "next/script";
import { GA_ID } from "@/lib/site";

/**
 * GA4。拡張計測（離脱クリック）に加えて、広告リンクのクリックを aff_click として送る。
 * place: data-place（置き場所）、program: coconala_tel / coconala_mail / amazon
 */
const CLICK = `document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a)return;var h=a.href||"";var pr=/px\\.a8\\.net/.test(h)?(/2IHXI2/.test(h)?"coconala_mail":"coconala_tel"):/amazon\\.co\\.jp/.test(h)?"amazon":"";if(!pr||typeof gtag!=="function")return;var pl=a.getAttribute("data-place");if(!pl){var b=a.closest("[data-place]");pl=b?b.getAttribute("data-place"):"other"}gtag("event","aff_click",{place:pl,program:pr,page_path:location.pathname})},true);`;

export function GA() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag("js",new Date());gtag("config","${GA_ID}");${CLICK}`}
      </Script>
    </>
  );
}
