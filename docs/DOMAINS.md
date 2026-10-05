# Connecting altannic.com & altannic.design (GoDaddy → AWS Amplify)

**Goal:** visitors type `altannic.com` or `altannic.design` and the site loads there, with your own
domain staying in the address bar. They should never see `*.amplifyapp.com` or `*.cloudfront.net`.

> **Why it currently shows the Amplify URL:** GoDaddy *forwarding* sends a redirect to
> `https://master.d11cxvj966thdw.amplifyapp.com`, so the browser leaves your domain.
> The fix is to point DNS at Amplify's CloudFront distribution. Amplify then serves the site
> **on your domain** with a free, auto-renewing SSL certificate.

Amplify app: `d11cxvj966thdw` · region `eu-west-2` · branch `master`.
Both domains are already added in Amplify (**Hosting → Custom domains**) and are waiting for
the DNS records below (status `PENDING_VERIFICATION`).

---

## Option A: keep DNS at GoDaddy (free)

GoDaddy can't point the bare (apex) domain at CloudFront, because it has no ALIAS/ANAME
record type. The standard setup, and the one AWS documents, is:

* **www.** → served by Amplify via a CNAME (this is what shows in the address bar)
* **bare domain** → GoDaddy forwards it to `https://www.…` (a plain redirect, **no masking**)

### altannic.com

GoDaddy → **My Products → altannic.com → DNS**

1. **Forwarding tab:** delete the existing forward that points to the amplifyapp URL.
2. **DNS Records tab:** add or edit these records. In *Name*, enter only the part shown; GoDaddy appends the domain.

| Type  | Name | Value | TTL |
|-------|------|-------|-----|
| CNAME | `_c5420348032bc8d25e63f3c38d123e18` | `_e7f9021b5cfbcb535ae91c484f416f1e.wzccmgtwzk.acm-validations.aws.` | 1 hour |
| CNAME | `www` | `d2fc5g627mc6po.cloudfront.net` | 1 hour |

   *If a `www` record already exists (e.g. `www → @`), **edit** it rather than adding a second one.*
3. **Forwarding tab → Add forwarding (domain):**
   * Destination: `https://` + `www.altannic.com`
   * Type: **Permanent (301)** (AWS's docs show 302; either works, 301 is better for SEO)
   * Settings: **Forward only.** Do **not** choose "Forward with masking": masking wraps the
     site in an iframe, breaks HTTPS and hurts SEO.

### altannic.design

GoDaddy → **My Products → altannic.design → DNS**

1. **Forwarding tab:** delete the existing forward to the amplifyapp URL.
2. **DNS Records tab:**

| Type  | Name | Value | TTL |
|-------|------|-------|-----|
| CNAME | `_a56173bd976487d0bbe37e8f83320f16` | `_36d87dfbee7b2440af1be09f9e3477b6.wzccmgtwzk.acm-validations.aws.` | 1 hour |
| CNAME | `www` | `d3vpmcyoyejfsb.cloudfront.net` | 1 hour |

   *There is currently a `www → altannic.design` CNAME. Edit it to the CloudFront value above.*
3. **Forwarding → Add forwarding:** `https://www.altannic.design`, Permanent (301), Forward only.

> Leave the `@` A records GoDaddy creates for forwarding (`3.33.251.168`, `15.197.225.128`) alone.
> They belong to the forwarding service.
> Do **not** delete the `_…acm-validations.aws` CNAMEs later, because Amplify uses them to renew the certificate.

**Result:** `www.altannic.com` and `www.altannic.design` stay in the address bar. Typing the bare
domain redirects there.

---

## Option B: move DNS to Amazon Route 53 (AWS's recommendation)

With this option the **bare domain itself** (`altannic.com`, without www) is served directly, and
Amplify creates and maintains every record for you. It costs about **US$0.50/month per domain**
(hosted zone) plus a few cents of queries. Neither domain has MX (email) records today, so email
is unaffected.

1. Create a Route 53 public hosted zone for each domain (I can do this for you).
2. In GoDaddy → **Domain → Nameservers → Change → "I'll use my own nameservers"**, enter the
   four `ns-….awsdns-…` servers from the hosted zone.
3. Amplify detects the zone and finishes everything automatically, typically within an hour
   (nameserver changes can take up to 48 h).

---

## Checking progress

```bash
aws amplify get-domain-association --region eu-west-2 --app-id d11cxvj966thdw \
  --domain-name altannic.com --query 'domainAssociation.[domainStatus,subDomains[].[subDomainSetting.prefix,verified]]'
```

Status flow: `PENDING_VERIFICATION` → `PENDING_DEPLOYMENT` → **`AVAILABLE`**.
After DNS changes it usually takes 15–60 minutes, and occasionally longer.

Under Option A, the bare-domain entry stays "unverified" in Amplify. That's expected,
because GoDaddy's forwarding handles it.
