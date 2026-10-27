# TAP Institute 홈페이지 제작 브리프

> 이 문서는 VS Code에서 홈페이지를 만들 때 쓰는 작업 지시서입니다.
> 프로젝트 폴더 맨 위에 두고, AI 코딩 도구(Claude Code, Copilot 등)에 "이 브리프대로 만들어 줘"라고 요청하면 됩니다.
> `[확인 필요]` 표시는 공개 전에 사람이 확인하거나 채워야 하는 부분입니다.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 회사명 | 주식회사 탭인스티튜트 (TAP Institute Co., Ltd.) |
| 사명 의미 | TAP = **T**echnical **A**nalysis of **P**lace |
| 사업 분야 | 위성영상 분석 · 공간분석 컨설팅 · GeoAI 교육 |
| 홈페이지 목적 | 공공기관·대학·국제협력 기관에 회사를 소개하고 문의를 받는 회사 소개 사이트 |
| 주요 방문자 | 지자체·공공기관 담당자, 교육기관, ODA·국제협력 파트너 |
| 형태 | 한 페이지(원페이지) 회사 소개 사이트 + 영문 페이지 |
| 대표 주소 | **https://tapinstitute.kr** (tapinstitute.co.kr는 대표 주소로 자동 연결) |

---

## 2. 도메인 현황 (2026-10-27 가비아 확인)

| 도메인 | 등록 기간 | 현재 DNS 설정 | 웹사이트 연결 |
|---|---|---|---|
| tapinstitute.kr | 2026-10-26 ~ 2027-10-26 | TXT 2개, MX 3개, DKIM 1개 (Zoho 메일용) | **연결 안 됨** (A·CNAME 레코드 없음) |
| tapinstitute.co.kr | 2026-10-26 ~ 2027-10-26 | 설정된 레코드 없음 | **연결 안 됨** |

- 등록처: 가비아 (네임서버 ns.gabia.co.kr)
- 연장 비용: 도메인당 21,000원/년. My가비아에서 자동 연장을 켜 둘 것.

### ⚠️ 건드리면 안 되는 DNS 레코드 (회사 메일용)

홈페이지를 연결할 때 아래 레코드는 **절대 지우거나 바꾸지 않습니다.** 지우면 회사 메일(aetti.kang@, info@, jay@tapinstitute.kr)이 끊깁니다.

| 타입 | 호스트 | 값 | 용도 |
|---|---|---|---|
| TXT | @ | zoho-verification=zb70218785.zmverify.zoho.com | Zoho 도메인 확인 |
| MX | @ | mx.zoho.com. (우선순위 10) | 메일 받기 |
| MX | @ | mx2.zoho.com. (우선순위 20) | 메일 받기 |
| MX | @ | mx3.zoho.com. (우선순위 50) | 메일 받기 |
| TXT | @ | v=spf1 include:zohomail.com ~all | 스팸 방지(SPF) |
| TXT | zmail._domainkey | v=DKIM1; k=rsa; p=… | 스팸 방지(DKIM) |

홈페이지용으로는 **A 레코드와 www CNAME 레코드만 새로 추가**합니다 (7장 참고).

---

## 3. 브랜드 가이드

### 로고 파일

`assets/` 폴더에 넣어 둘 파일 (함께 전달된 파일):

| 파일 | 용도 |
|---|---|
| `TAP_Institute_logo.png` | **상단 메뉴 로고** (투명 배경, 실제 사이트에서 사용) |
| `TAP_Institute_logo.svg` | 인쇄물·확대용 원본 |
| `TAP_Institute_symbol.svg` | 파비콘(브라우저 탭 아이콘), 작은 자리 |
| `TAP_Institute_symbol.png` | **푸터·첫 화면 큐브** (실제 사이트에서 사용) |

- 홈페이지 안에서는 로고를 **PNG로** 넣습니다. SVG를 `<img>`로 넣으면 브라우저가 폰트를 불러오지 못해 INSTITUTE 글자가 다르게 보이기 때문입니다. SVG는 인쇄소 전달용 원본으로 둡니다.
- 로고 비율을 바꾸거나 색을 임의로 바꾸지 않습니다.

### 색상

| 이름 | HEX | 쓰임 |
|---|---|---|
| Ink (남색) | `#13294B` | 제목, 로고 T면, 상단 메뉴 글자, 진한 배경 |
| Mid (청색) | `#2B5C8A` | 로고 P면, 보조 강조, 링크 hover |
| Accent (청록) | `#0E9488` | 로고 A면, 버튼, 구분선, 아이콘 |
| Slate (회청) | `#556274` | 보조 글자, 캡션 |
| Text | `#1F2937` | 본문 글자 |
| Background | `#FFFFFF` | 기본 배경 |
| Soft BG | `#F4F7FA` | 섹션 구분용 연한 배경 |

- 흰 글자를 Accent(`#0E9488`) 위에 쓸 때는 18px 이상 굵은 글자로만 씁니다 (대비 확보).

### 글꼴

| 용도 | 글꼴 |
|---|---|
| 영문 제목·숫자·로고 | **Jost** (500, 600) |
| 한글 제목·본문 | **IBM Plex Sans KR** (400, 500, 600) |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=IBM+Plex+Sans+KR:wght@400;500;600&display=swap" rel="stylesheet">
```

### 분위기

- 연구소다운 신뢰감, 깔끔하고 기술적인 느낌.
- 넓은 여백, 직선과 격자, 지도·위성영상 느낌의 이미지.
- 피할 것: 화려한 그라데이션, 이모지, 과장된 홍보 문구, 근거 없는 숫자("고객 만족 99%" 같은 것).

---

## 4. 사이트 구성 (원페이지)

상단 메뉴에서 각 섹션으로 부드럽게 스크롤 이동합니다.

| 순서 | 섹션 ID | 메뉴 이름 | 내용 |
|---|---|---|---|
| 1 | `#home` | (로고) | 첫 화면(히어로) |
| 2 | `#about` | 회사소개 | TAP의 의미, 회사 소개 |
| 3 | `#services` | 사업분야 | 사업 분야 3가지 |
| 4 | `#approach` | 수행방식 | 데이터 → 분석 → 결과 전달 과정 |
| 5 | `#ceo` | 대표 소개 | 대표 약력 |
| 6 | `#contact` | 문의 | 연락처, 주소, 지도 |
| - | footer | - | 사업자 정보, 저작권 |

- 상단 메뉴 오른쪽에 **KR / EN** 전환 링크 (`/` ↔ `/en/`).
- 휴대폰에서는 메뉴가 햄버거 버튼으로 접힙니다.

---

## 5. 섹션별 문구 (초안)

> 문구는 초안입니다. 대표가 검토 후 고칩니다.

### 5-1. 첫 화면 (Hero)

- 큰 제목: **공간을 기술로 분석합니다**
- 영문 보조 제목: *Technical Analysis of Place*
- 설명: 위성영상과 공간정보, AI 분석으로 국토와 지역의 문제를 진단하고 해결 방안을 제시합니다.
- 버튼 1: `사업분야 보기` → `#services`
- 버튼 2: `문의하기` → `#contact`
- 배경: 현재 남색 바탕 + 얇은 격자(경위도선) 패턴 + 오른쪽 큐브 심볼. 사용 권한이 있는 위성영상 이미지가 생기면 `assets/images/`를 만들어 넣고 교체합니다.

### 5-2. 회사소개 (About)

- 제목: **TAP Institute**
- 본문:
  > ㈜탭인스티튜트는 위성영상 분석, 공간분석 컨설팅, GeoAI 교육을 수행하는 공간분석 전문 기업입니다.
  > 오랜 기간 GIS·원격탐사·공간정보 정책 분야에서 쌓은 연구와 교육 경험을 바탕으로, 공공기관이 위성과 공간 데이터를 실제 정책과 현장에 활용할 수 있도록 분석부터 교육까지 함께합니다.
- TAP 세 글자 카드 (로고 큐브 색과 맞춤):
  - **T — Technical** (Ink): 검증된 분석 기술과 방법론
  - **A — Analysis** (Accent): 데이터에 근거한 객관적 분석
  - **P — Place** (Mid): 장소와 지역에 대한 이해

### 5-3. 사업분야 (Services)

카드 3개, 각 카드에 아이콘(선 아이콘, SVG) + 제목 + 설명 + 세부 항목.

1. **위성영상 분석**
   - 광학·SAR 위성영상을 처리하고 분석합니다.
   - InSAR 기반 지반침하·지표변위 분석
   - 홍수·댐 방류 등 재난 대응 분석
   - 토지이용·농업 원격탐사 분석
2. **공간분석 컨설팅**
   - 공간 데이터로 정책과 사업의 근거를 만듭니다.
   - GIS 기반 입지·공간 분석
   - 공공기관 학술연구용역
   - 공간정보 활용 정책 자문, ODA·국제협력 사업 기획
3. **GeoAI 교육**
   - 공간정보와 AI를 현장에서 쓸 수 있게 가르칩니다.
   - QGIS 등 GIS 실무 교육
   - 위성영상 처리와 AI 분석 교육
   - 재직자 교육, 대학 강의, 온라인 교육 콘텐츠 제작

### 5-4. 수행방식 (Approach)

가로 4단계 흐름 (휴대폰에서는 세로):

1. **과제 정의** — 발주기관과 분석 목적과 범위를 정합니다.
2. **데이터 수집·처리** — 위성영상과 공간 데이터를 모으고 정리합니다.
3. **분석** — GIS·원격탐사·AI 기법으로 분석합니다.
4. **결과 전달** — 지도·대시보드·보고서로 전달하고, 필요하면 교육까지 지원합니다.

### 5-5. 대표 소개 (CEO)

- 이름: **강애띠** · 대표이사 · 지리학 박사
- 대표 사진은 **넣지 않습니다** (2026-10-27 결정).
- 약력
  - 이화여자대학교 지리학 박사
  - 고려사이버대학교·서울디지털대학교 겸임교수
  - 대한지리학회 홍보이사
  - 위성영상 AI 분석, SAR/InSAR 지반침하 모니터링, GeoAI 분야 연구·사업 수행
  - 정부 R&D·ODA 사업(NIA, NIPA, KOICA, 농촌진흥청 등) 기획 및 수행
  - K-MOOC, LX 공간정보아카데미 등 공간정보 교육과정 개발
- 현재 다른 기관 재직 사항은 홈페이지에 넣지 않습니다 `[확인 필요]`.

### 5-6. 문의 (Contact)

| 항목 | 내용 |
|---|---|
| 이메일 | info@tapinstitute.kr |
| 대표 이메일 | aetti.kang@tapinstitute.kr |
| 전화 | 010-4513-7281 (영문 +82-10-4513-7281) — 2026-10-27 공개 결정 |
| 주소 | 서울특별시 영등포구 국제금융로6길 33, 919호 C409 (여의도동, 맨하탄빌딩) 07331 |

- 이메일은 `mailto:` 링크로 만듭니다.
- 지도: 카카오맵 또는 네이버 지도 "지도 보기" 링크 버튼 (지도 삽입은 선택).
- 문의 양식(폼)은 1차 버전에서는 넣지 않습니다. 서버가 없는 정적 사이트이기 때문입니다. 필요하면 나중에 Formspree 같은 서비스로 추가합니다.

### 5-7. 푸터 (Footer)

```
주식회사 탭인스티튜트 | 대표이사 강애띠 | 사업자등록번호 607-88-04241
서울특별시 영등포구 국제금융로6길 33, 919호 C409 (여의도동, 맨하탄빌딩)
info@tapinstitute.kr
© 2026 TAP Institute Co., Ltd. All rights reserved.
```

---

## 6. 영문 페이지 (`/en/`)

같은 구성, 같은 디자인으로 만듭니다.

- Hero: **Analyzing Place with Technology** / *Technical Analysis of Place*
- Services: Satellite Imagery Analysis · Spatial Analytics Consulting · GeoAI Education
- CEO: **Aetti Kang, Ph.D.** · CEO
- Address: Rm. C409, 919, 33 Gukjegeumyung-ro 6-gil, Yeongdeungpo-gu, Seoul 07331, Republic of Korea
- Footer: TAP Institute Co., Ltd. | CEO Aetti Kang | Business Registration No. 607-88-04241

---

## 7. 기술 사양

### 만드는 방식

- **정적 사이트**: HTML + CSS + 약간의 JavaScript. 빌드 도구나 프레임워크 없이 만듭니다 (유지보수를 쉽게).
- 반응형: 휴대폰(375px)부터 데스크톱(1440px)까지.
- 외부 라이브러리 최소화. 아이콘은 인라인 SVG.

### 폴더 구조

```
tapinstitute-web/
├── TAP_Institute_homepage_brief.md   ← 이 문서
├── index.html          ← 한국어 메인
├── en/
│   └── index.html      ← 영문
├── css/
│   └── style.css
├── js/
│   └── main.js         ← 모바일 메뉴, 스크롤 이동
├── assets/
│   ├── TAP_Institute_logo.svg
│   ├── TAP_Institute_logo.png
│   ├── TAP_Institute_symbol.svg
│   ├── TAP_Institute_symbol.png
│   ├── og-image.png    ← 1200×630 공유 미리보기 이미지
│   └── images/         ← (나중에) 위성영상 이미지
├── favicon.svg         ← symbol 기반
├── CNAME               ← 내용: tapinstitute.kr (GitHub Pages용)
├── robots.txt
└── sitemap.xml
```

### 기본 품질 기준

- `<html lang="ko">`, 영문은 `lang="en"`.
- 페이지 제목: `TAP Institute | 위성영상 분석 · 공간분석 컨설팅 · GeoAI 교육`
- meta description, Open Graph(카카오톡·링크 공유 미리보기) 태그 넣기.
- 이미지마다 `alt` 문구.
- 글자와 배경 대비 4.5:1 이상, 버튼은 키보드로도 누를 수 있게.
- 이미지는 WebP로 압축, 첫 화면 외 이미지는 `loading="lazy"`.
- 네이버 서치어드바이저, 구글 서치콘솔 등록을 염두에 두고 `sitemap.xml` 준비.

---

## 8. 공개(호스팅)와 도메인 연결

추천: **GitHub Pages** (무료, HTTPS 자동).

### 순서

1. GitHub 계정을 만들고 저장소 `tapinstitute-web`을 만듭니다.
2. VS Code에서 만든 파일을 저장소에 올립니다 (push).
3. 저장소 **Settings → Pages**에서 Branch를 `main` / `root`로 지정합니다.
4. 같은 화면 **Custom domain**에 `tapinstitute.kr` 입력 → 저장.
5. 가비아 DNS 관리툴 → tapinstitute.kr → 레코드 수정에서 **아래 5개만 추가**합니다 (기존 메일 레코드는 그대로 둠).

| 타입 | 호스트 | 값/위치 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<GitHub아이디>.github.io.` (끝에 마침표) |

6. DNS가 반영되면(수십 분~몇 시간) GitHub Pages에서 **Enforce HTTPS**를 켭니다.
7. **tapinstitute.co.kr**: 가비아 DNS 관리툴 → **포워딩** 설정에서 `https://tapinstitute.kr`로 연결합니다.

> GitHub Pages의 IP 주소는 바뀔 수 있으니, 연결 직전에 GitHub 공식 문서("Managing a custom domain for your GitHub Pages site")에서 다시 확인합니다.

---

## 9. 작업 순서 (AI 코딩 도구에 요청할 때)

1. "브리프 3·4·5장대로 `index.html`, `css/style.css`, `js/main.js`를 만들어 줘."
2. 브라우저에서 열어 보고 문구·배치 수정 요청.
3. "같은 디자인으로 `en/index.html` 영문 페이지를 만들어 줘."
4. "파비콘, Open Graph 이미지, robots.txt, sitemap.xml을 추가해 줘."
5. 휴대폰 화면(개발자도구 375px)으로 확인.
6. 8장 순서대로 GitHub Pages에 올리고 도메인 연결.

---

## 10. 공개 전 확인 목록

- [x] 대표 사진 넣지 않기로 결정
- [ ] 공개할 약력 항목 최종 확인
- [x] 대표 전화번호 010-4513-7281 공개로 결정
- [ ] (선택) 위성영상 이미지 사용 권한 확인 후 교체 (직접 분석한 결과 이미지 권장)
- [ ] 문구 최종 검토 (국문·영문)
- [ ] 휴대폰·PC에서 화면 확인
- [ ] 메일 레코드(MX·TXT)가 그대로 있는지 가비아에서 확인
- [ ] https://tapinstitute.kr, https://www.tapinstitute.kr, tapinstitute.co.kr 모두 접속 확인
